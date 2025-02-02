const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    isVerified: { type: Boolean, default: false },
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'session' }, // Remove required as it will be set during registration
    applcationId: { type: mongoose.Schema.Types.ObjectId, ref: 'application' },
    applicationStatus: { type: String, enum: ['pending', 'rejected', "verified"], default: 'pending' },
    cuetApplicationNo: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    category: { type: String, required: true },
    cuetScore: { type: Number, required: true },
    course: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);


