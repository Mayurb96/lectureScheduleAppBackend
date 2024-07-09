// routes/instructor.js
const express = require('express');
const router = express.Router();
const { findAll, addCourse, findById, deleteById, updateById} = require('../Controller/course.Controller');
const { authorizeAdmin } = require('../Controller/admin.auth');


router.get('/', authorizeAdmin, findAll);
router.post('/add', authorizeAdmin, addCourse);
router.post('/:id', authorizeAdmin, findById);
router.delete('/:id', authorizeAdmin, deleteById);
router.patch('/:id', authorizeAdmin, updateById);

module.exports = router;
