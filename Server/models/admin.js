const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name : {type : String,required : true},
    email : {type : String ,required : true,unique : true},
    password : {type : String ,required : true},
    isVerified : {type :Boolean,default : false},
    role: { type: String, enum: ['admin', 'student'], required: true },
    studentId : { type: mongoose.Schema.Types.ObjectId, ref: 'student'},
    
},{ timestamps: true });


module.exports = mongoose.model('Admin', adminSchema);
