const argon = require('argon2');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Session = require('../models/session');
const crypto = require('crypto');
const { sendEmail } = require('../utils/sendEmail');

// Test email function
exports.testEmail = async (req, res) => {
    try {
        await sendEmail({
            email: process.env.EMAIL_USER, // Use the configured email
            subject: "Test Email from CSIT Counselling System",
            message: "This is a test email to verify the email sending functionality is working."
        });
        
        return res.status(200).json({
            message: "Test email sent successfully",
            sentTo: process.env.EMAIL_USER
        });
    } catch (error) {
        console.error('Test email error:', error);
        return res.status(500).json({
            message: "Failed to send test email",
            error: error.message,
            errorDetails: error.stack
        });
    }
};

// Generate a random password
const generateTempPassword = () => {
    return crypto.randomBytes(4).toString('hex');
};

// Helper function to ensure active session exists
const ensureActiveSession = async () => {
    let activeSession = await Session.findOne({ 
        sessionStatus: 'active',
        formStatus: 'active'
    });

    if (!activeSession) {
        // Create a new active session if none exists
        activeSession = new Session({
            courseType: 'UG',
            sessionStatus: 'active',
            formStatus: 'active'
        });
        await activeSession.save();
    }
    return activeSession;
};

// Register student with CUET application number
exports.initiateRegistration = async (req, res) => {
    try {
        const { cuetApplicationNo } = req.body;

        // Find student by CUET application number
        const student = await Student.findOne({ cuetApplicationNo });
        if (!student) {
            return res.status(404).json({
                message: "No student found with this CUET application number"
            });
        }

        if (student.password) {
            return res.status(400).json({
                message: "Student is already registered"
            });
        }

        // Ensure active session exists
        const activeSession = await ensureActiveSession();

        // Generate temporary password and hash it
        const tempPassword = generateTempPassword();
        const hashedPassword = await argon.hash(tempPassword);

        try {
            // Send registration email with temporary password
            await sendEmail({
                email: student.email,
                subject: "CSIT Counselling System - Your Temporary Password",
                message: `Dear ${student.name},\n\nYour temporary password for CSIT Counselling System is: ${tempPassword}\n\nPlease change your password upon first login for security purposes.\n\nBest regards,\nCSIT Counselling Team`
            });

            // Update student record
            student.password = hashedPassword;
            student.sessionId = activeSession._id;
            await student.save();

            return res.status(200).json({
                message: "Registration successful. Please check your email for the temporary password.",
                email: student.email
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            return res.status(500).json({
                message: "Failed to send temporary password email",
                error: emailError.message
            });
        }

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


// Helper function to create a test student (temporary, for testing)
exports.createTestStudent = async (req, res) => {
    try {
        const testStudent = new Student({
            name: "Test Student",
            email: process.env.EMAIL_USER, // Use your configured email
            cuetApplicationNo: "CUET2024TEST",
            dob: new Date("2000-01-01"),
            phone: "1234567890",
            gender: "Male",
            category: "General",
            cuetScore: 95,
            course: "B.Tech",
            applicationStatus: "pending"
        });

        await testStudent.save();

        return res.status(201).json({
            message: "Test student created successfully",
            student: {
                cuetApplicationNo: testStudent.cuetApplicationNo,
                email: testStudent.email
            }
        });
    } catch (error) {
        console.error('Test student creation error:', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


exports.loginStudent = async (req, res) => {
    try {
        const { cuetApplicationNo, password } = req.body;

        const student = await Student.findOne({ cuetApplicationNo });
        if (!student) {
            return res.status(401).json({
                message: "Invalid Application number"
            });
        }

        const isValidPassword = await argon.verify(student.password, password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid Password "
            });
        }

        const token = jwt.sign(
            {
                id: student._id,
                cuetApplicationNo: student.cuetApplicationNo,
                isVerified: student.isVerified
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                cuetApplicationNo: student.cuetApplicationNo,
                isVerified: student.isVerified,
                requiresPasswordChange: !student.isVerified
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const studentId = req.user.id; // From auth middleware

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const isValidPassword = await argon.verify(student.password, currentPassword);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Current password is incorrect"
            });
        }

        const hashedNewPassword = await argon.hash(newPassword);
        student.password = hashedNewPassword;
        student.isVerified = true;
        await student.save();

        return res.status(200).json({
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error('Password update error:', error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

