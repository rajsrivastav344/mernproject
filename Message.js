// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  question: { type: String, default: '' }, // User's message
  answer: { type: String, default: '' },   // Admin's reply
  examineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Examinee', required: true },
  deletedBy: { type: String, enum: ['admin', 'user', null], default: null },
  editedBy: { type: String, enum: ['admin', 'user', null], default: null }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);