const Admin = require('../models/Admin');
const Examinee = require('../models/Examinee');
const Question = require('../models/QuestionBank');
const Examination = require('../models/Examination');
const Exam = require('../models/Examination');
const Subject = require('../models/Subject');
const express = require('express');
const router = express.Router();
const ExamAttempted = require('../models/ExamAttempted');

router.get('/', async (req, res) => {
    try {
        const totalExaminees = await Examinee.countDocuments();
        const totalQuestions = await Question.countDocuments();
        const totalExams = await Exam.countDocuments();
        const totalSubject = await Subject.countDocuments();

        return res.status(200).json({
            totalExaminees,
            totalQuestions,
           
            totalExams,
            totalSubject
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return res.status(500).json({ message: "Server error while fetching dashboard data" });
    }
});

router.get('/exams/:id', async (req, res) => {
    try {
        const examineeId = req.params.id;
        const exam = await Examination.countDocuments({ examineeId: examineeId });
        if (!exam) {
            return res.status(404).json({ message: "Exam not found" });
        }
        return res.status(200).json(exam);
    } catch (error) {
        console.error('Error fetching exam details:', error);
        return res.status(500).json({ message: "Server error while fetching exam details" });
    }
});

// status for the examinee router
router.get('/examinee-result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const examination = await ExamAttempted.countDocuments({
      resultStatus: 'Completed',
      status:'Passed',
      examineeId: id,
    });

    return res.json({ message: examination });
  } catch (error) {
    console.error('Error fetching examinee result:', error);
    return res.status(500).json({ error: 'Failed to fetch result' });
  }
});
module.exports = router;