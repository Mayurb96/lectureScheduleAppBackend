// routes/instructor.js
const express = require('express');
const router = express.Router();
const { findAll, addSchedule, findById, deleteById, updateById } = require('../Controller/schedule.controller');
const { authorizeAdmin } = require('../Controller/admin.auth');
const { verifyToken }= require('../Controller/insturctor.controller')

router.get('/', authorizeAdmin, findAll);
router.post('/add', authorizeAdmin, addSchedule);
router.post('/:id', verifyToken, findById);
router.delete('/:id', authorizeAdmin, deleteById);
router.patch('/:id', authorizeAdmin, updateById);

module.exports = router;
