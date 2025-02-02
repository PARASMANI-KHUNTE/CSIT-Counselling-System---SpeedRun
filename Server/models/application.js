const mongoose = require('mongoose');
const ApplicaionSchema = new mongoose.Schema({
    courseType: { type: String, enum: ['UG', 'PG']},
    nameOfCandidate : {type :String },
    nameOfCourse : {type : String , enum :[ 'BCA' , "BSC" ,'MCA',"MSC",['BCA' , "BSC"],['MCA',"MSC"]]},
    fatherName : {type :String},
    motherName : {type :String},
    DOB : {type : Date},
    CuetRollNo : {type : String},
    score: { 
        type: Number, 
        required: true, 
        min: 0, // Optional: Ensure the number is non-negative
        max: 200 // This ensures the number is <= 200
    },
    MeritPosition : {type : String},
    CuetForm : {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    MarksInPercentage : {
        type: Number, 
        required: true, 
        min: 0, // Optional: Ensure the number is non-negative
        max: 100 // This ensures the number is <= 100
    },
    PH : {
        type : Boolean,
        default : false
    },
    CastCertificate : {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    Category : {type : String , enum : ["SC","UR","ST","OBC","EWS","PWD"]},
    TwelveWithMaths : {type :Boolean },
    StreamName : {type :String},
    BSC :{type :Boolean },
    BCA :{type :Boolean },
    anyGraduation : {type :String},
    email : {type :String},
    phoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 10; // Ensures exactly 10 digits
            },
            message: "Phone number must be exactly 10 digits",
        }
    },
    secondaryPhoneNumber : {
        type: Number,
        validate: {
            validator: function (v) {
                return v.toString().length === 10; // Ensures exactly 10 digits
            },
            message: "Phone number must be exactly 10 digits",
        }
    },
    studentAadharNumber : {
        type : Number ,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 12; // Ensures exactly 10 digits
            },
            message: "Phone number must be exactly 12 digits",
        }
    },
    currentAddress : {
        type : String,
    },
    PermanenetAddress :{
        type :String
    },
    State :{
        type :String
    },
    Pincode : {
        type : Number
    },
    BloodGroup : {
        type : String,
        enum : ['A+','A-','B+','B-','O+','O-','AB+','AB-','unknown']
    },
    UgAllSemMarkSheet : {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    twelveMarkSheet : {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    TwelvePercent : {
        type: Number, 
        required: true, 
        min: 0, // Optional: Ensure the number is non-negative
        max: 100 // This ensures the number is <= 100
    },
    TenMarkSheet : {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    TenPercent : {
        type: Number, 
        required: true, 
        min: 0, // Optional: Ensure the number is non-negative
        max: 100 // This ensures the number is <= 100
    },
    candidatePassportPhoto : {
        type : String,
    },
    candidateSign  : {
        type : String,
    },
    AadharCard: {type :mongoose.Schema.Types.ObjectId,ref:"pdfSchema"},
    DeclarationOfTheCandidate :{type : Boolean , required : true}


})


module.exports = mongoose.model("Application",ApplicaionSchema);