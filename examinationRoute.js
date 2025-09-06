const express = require('express')
const router = express.Router();
const Question = require('../models/QuestionBank');
const Examination = require('../models/Examination');
const mongoose = require('mongoose');
const Examinee = require('../models/Examinee');

const ExamAttempted = require('../models/ExamAttempted');

// POST: Create a new exam
router.post('/', async (req, res) => {
  console.log("Incoming body:", req.body);

  try {
    const {
      examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status,
      questionDistribution
    } = req.body;

    // Validate required fields
    if (!examName || !date || !time || !duration || !totalMarks || !passingMarks || !sessionId || !questionDistribution) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate sessionId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ error: `Invalid session ID: ${sessionId}` });
    }

    const selectedQuestions = [];

    // Validate questionDistribution and fetch questions
    for (const dist of questionDistribution) {
      const { subject, numberOfQuestions } = dist;
      const questionCount = parseInt(numberOfQuestions);

      if (!mongoose.Types.ObjectId.isValid(subject)) {
        return res.status(400).json({ error: `Invalid subject ID: ${subject}` });
      }

      if (isNaN(questionCount) || questionCount <= 0) {
        return res.status(400).json({ error: `Invalid number of questions for subject: ${subject}` });
      }

      const questions = await Question.aggregate([
        { $match: { subject: new mongoose.Types.ObjectId(subject) } },
        { $sample: { size: questionCount } }
      ]);

      if (questions.length < questionCount) {
        return res.status(400).json({ error: `Not enough questions available for subject: ${subject}` });
      }

      selectedQuestions.push(...questions.map(q => q._id));
    }

    const newExam = new Examination({
      title: examName,
      date,
      time,
      duration,
      totalMarks,
      passingMarks,
      sessionId,
      status: status || 'Scheduled',
      questionDistribution: questionDistribution.map(d => ({
        subject: d.subject,
        questionCount: parseInt(d.numberOfQuestions)
      })),
      questions: selectedQuestions
    });

    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    console.error('Error creating exam:', err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// GET: Fetch all exams
router.get('/exams', async (req, res) => {
  try {
    const exams = await Examination.find({})
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');
    res.json(exams);
  } catch (err) {
    console.error('Error fetching exams:', err);
    res.status(500).json({ error: 'Error fetching exams' });
  }
});

// PUT: Update an exam
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const updatedExam = await Examination.findByIdAndUpdate(id, req.body, { new: true })
      .populate('sessionId', 'name')
      .populate('questionDistribution.subject', 'name');

    if (!updatedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json(updatedExam);
  } catch (err) {
    console.error('Error updating exam:', err);
    res.status(400).json({ error: 'Error updating exam' });
  }
});

// DELETE: Delete an exam
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid exam ID: ${id}` });
    }

    const deletedExam = await Examination.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    console.error('Error deleting exam:', err);
    res.status(500).json({ error: 'Error deleting exam' });
  }
});

// GET: Fetch questions for a specific exam
router.get('/exam/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: `Invalid exam ID: ${examId}` });
    }

    const exam = await Examination.findById(examId)
      .populate('questionDistribution.subject', 'name')
      .populate('questions');

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    const allQuestions = [];

    for (const dist of exam.questionDistribution) {
      const subjectId = dist.subject._id;
      const questionCount = dist.questionCount;

      const questions = await Question.aggregate([
        { $match: { subject: new mongoose.Types.ObjectId(subjectId) } },
        { $sample: { size: questionCount } }
      ]);

      if (questions.length < questionCount) {
        return res.status(400).json({ error: `Not enough questions for subject: ${subjectId}` });
      }

      allQuestions.push(...questions);
    }

    return res.json({
      exam: {
        title: exam.title,
        date: exam.date,
        time: exam.time,
        duration: exam.duration,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks,
        status: exam.status
      },
      questions: allQuestions
    });
  } catch (err) {
    console.error('Error fetching exam questions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//exam submission route
router.post('/submit-exam', async (req, res) => {
  try {
    const { examId, answers,email } = req.body;
    const userId= await Examinee.findOne({email:email});

    if (!mongoose.Types.ObjectId.isValid(examId)) {
      return res.status(400).json({ error: `Invalid exam ID: ${examId}` });
    }

    const exam = await Examination.findById(examId).populate('questions');
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    // here is
    let score = 0;
    const totalMarks = parseInt(exam.totalMarks);
    const marksPerQuestion = totalMarks / exam.questions.length;

    const results = exam.questions.map((question) => {
      const submittedAnswer = answers[question._id];
      const isCorrect = submittedAnswer === question.correctAnswer;
      if (isCorrect) {
        score += marksPerQuestion;
      }
      return {
        questionId: question._id,
        question: question.question,
        selectedAnswer: submittedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const passed = score >= parseInt(exam.passingMarks);
     
    const examAttempted=await new ExamAttempted({
      examineeId:userId._id,
      examId:exam._id,
      score,
      totalMarks,
      passingMarks:parseInt(exam.passingMarks),
      status:passed?'Passed':'Failed',
      resultStatus:'Pending',
    });
  
   examAttempted.save();
 res.json({message:'Exam Submitted successfully' });
  } catch (err) {
    console.error('Error submitting exam:', err);
    res.status(500).json({ error: 'Failed to submit exam' });
  }
});

router.get('/report', async (req, res) => {
  try {
    const exams = await ExamAttempted.find()
      .populate('examineeId')
      .populate('examId');
    
    const report = exams.map(exam => ({
      examineeEmail: exam.examineeId?.email || 'N/A',
      examineeName: exam.examineeId?.name || 'N/A',
      examTitle: exam.examId?.title || 'Exam Deleted',
      score: exam.score,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      status: exam.status,
      resultStatus: exam.resultStatus,
      attemptedAt: exam.createdAt
    }));

    res.json(report);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});



router.post('/result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await ExamAttempted.findByIdAndUpdate(
      id,
      { resultStatus: 'Completed', updatedAt: new Date() },
      { new: true }
    ).populate('examId');
    if (!exam) {
      return res.status(404).json({ message: "Exam attempt not found" });
    }
    return res.json({ message: "Result Declared Successfully", exam });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while declaring result" });
  }
});
// get all examination
router.get('/examination', async (req, res) => {
  const examination = await ExamAttempted.find({ resultStatus: 'Pending' }).populate('examId')
  return res.json({ message: examination })
})

// get user by using examinee id
router.get('/examinee-result/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const examination = await ExamAttempted.findOne({
      resultStatus: 'Pending',
      examineeId: id,
    }).populate('examId').populate('examineeId');

    return res.json({ message: examination });
  } catch (error) {
    console.error('Error fetching examinee result:', error);
    return res.status(500).json({ error: 'Failed to fetch result' });
  }
});

module.exports = router;
