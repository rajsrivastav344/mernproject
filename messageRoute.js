// routes/messageRoute.j
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Examinee = require('../models/Examinee');

// ✅ Create message (user)
router.post('/', async (req, res) => {
  try {
    const { question, examineeId } = req.body;

    // Make sure it's stored as ObjectId
    if (!examineeId) return res.status(400).json({ message: 'examineeId required' });

    const msg = new Message({
      question,
      examineeId: new mongoose.Types.ObjectId(examineeId) // ✅ Force ObjectId
    });

    await msg.save();
    return res.status(201).json({ message: 'Message created', data: msg });
  } catch (err) {
    console.error('Error creating message:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Get all messages (admin view)
router.get('/all', async (req, res) => {
  try {
    const msgs = await Message.find()
      .populate('examineeId', 'name email')
      .sort({ createdAt: -1 });
    return res.json({ message: msgs });
  } catch (err) {
    console.error('Error fetching all messages:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get messages for specific user
router.get('/user/:id', async (req, res) => {
  try {
    const msgs = await Message.find({ examineeId: req.params.id })
      .populate('examineeId', 'name email')
      .sort({ createdAt: -1 });
    return res.json({ message: msgs });
  } catch (err) {
    console.error('Error fetching user messages:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ User edits their message
router.put('/edit/:id', async (req, res) => {
  try {
    const { question, role, userId } = req.body;
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    if (role !== 'user' || msg.examineeId.toString() !== userId) {
      return res.status(403).json({ message: 'Not allowed to edit this message' });
    }

    msg.question = question;
    msg.editedBy = 'user';
    await msg.save();

    return res.json({ message: 'Message updated', data: msg });
  } catch (err) {
    console.error('Error editing message:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Admin replies or edits reply
router.put('/reply/:id', async (req, res) => {
  try {
    const { answer, role } = req.body;
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can reply or edit reply' });
    }

    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { answer, editedBy: 'admin' },
      { new: true }
    ).populate('examineeId', 'name email');

    if (!updated) return res.status(404).json({ message: 'Message not found' });

    return res.json({ message: 'Reply saved', data: updated });
  } catch (err) {
    console.error('Error saving reply:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Soft delete by role
router.put('/delete/:id', async (req, res) => {
  try {
    const { role, userId } = req.body;
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    if (role === 'user') {
      if (msg.examineeId.toString() !== userId) {
        return res.status(403).json({ message: 'Not allowed to delete this message' });
      }
      msg.question = 'Message deleted by User';
      msg.deletedBy = 'user';
    } else if (role === 'admin') {
      msg.answer = 'Reply deleted by Admin';
      msg.deletedBy = 'admin';
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await msg.save();
    return res.json({ message: 'Message marked deleted', data: msg });
  } catch (err) {
    console.error('Error soft-deleting message:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;