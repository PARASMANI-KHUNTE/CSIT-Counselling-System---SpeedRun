const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    courseType: { type: String, enum: ['UG', 'PG']},
    sessionStatus: { type: String, enum: ['active', 'closed']},
    formStatus :{type :String ,  enum: ['active', 'closed']}
}, { timestamps: true });




module.exports = mongoose.model('Session', sessionSchema);;