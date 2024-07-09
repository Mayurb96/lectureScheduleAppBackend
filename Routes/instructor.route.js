// routes/instructor.js
const express = require('express');
const router = express.Router();
const { findAll, addInstructor, findById, deleteById , updateById , verifyToken , login , logout } = require('../Controller/insturctor.controller');
const { authorizeAdmin } = require('../Controller/admin.auth');


router.post('/login', login);
router.post('/logout', logout);    

router.get('/', verifyToken ,findAll);
router.post('/add', authorizeAdmin, addInstructor);
router.post('/:id', verifyToken, findById);
router.delete('/:id', verifyToken, deleteById);
router.patch('/:id', verifyToken , updateById);

module.exports = router;
