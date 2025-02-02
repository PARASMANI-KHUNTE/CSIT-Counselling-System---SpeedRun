const mongoose = require('mongoose');
const pdfSchema = new mongoose.Schema({
    filename: String,
    data: Buffer, // Store file as binary data
    contentType: String,
  });
  
const PdfModel = mongoose.model("Pdf", pdfSchema)