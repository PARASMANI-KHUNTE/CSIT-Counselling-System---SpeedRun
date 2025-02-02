const express = require('express');
const router = express.Router();
const { initiateRegistration, loginStudent, updatePassword, createTestStudent, testEmail } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post("/initiate-registration", initiateRegistration);
router.post("/login", loginStudent);
router.post("/create-test-student", createTestStudent); // Temporary route for testing
router.post("/test-email", testEmail); // Test email route

// Protected routes
router.post("/update-password", authMiddleware, updatePassword);

module.exports = router;