const mongoose = require('mongoose');
const Course = require('../Models/course.model.js');
const Instructor = require('../Models/instructor.model.js');
const Schedule = require('../Models/schedule.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';

async function findAll(req, res, next){

    try {
        const instructors= await Instructor.find();
        console.log(instructors);
        res.json(instructors);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function addInstructor(req, res, next){
console.log(req.body)
const { name, email, password, course, date, courseName, courseLevel , lectures } = req.body;

// Log to debug
console.log('Received data:', { name, email, password, course, date, courseName, courseLevel, lectures });

if (!email) {
  return res.status(400).json({ error: 'Email is required' });
}

try {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const instructor = new Instructor({
    name,
    email: email,
    password,
    hash:hashedPassword,
    course,
    date ,
    courseName,
    courseLevel,
    role: 'instructor',
    lectures,
  });

    const result = await instructor.save();
    console.log(result);
    res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function findById(req, res, next){

    console.log("id",req.params.id,req.body);

    try {
        const id=req.params.id;
        const instructor= await Instructor.findById(id);
        console.log(instructor);
        res.json(instructor);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
async function deleteById(req, res, next){

    try {
        const id=req.params.id;
        const instructor= await Instructor.findByIdAndDelete(id, function (err, docs) {
          
            if (err) {
              console.error(err);
              res.status(400).send('Invalid id');
              return;
          }
          else if (!docs) {
              res.status(404).send('Not found');
              return;
          }
          else {
              console.log("Deleted:", docs);
              res.status(200).send('Deleted successfully');
          }
        });
       // res.status(200).send("Deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
async function updateById(req, res, next){

    try {
        const id=req.params.id;
        const updates = req.body;
        const options = { new: true };
        const instructor= await Instructor.findByIdAndUpdated( id, updates , options );
        console.log(instructor);
        res.json(instructor);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function login(req , res , next ) {
  try{
    console.log(req.body)

    const email= req.body.email;
    const password= req.body.password;
 console.log(email,password)
 
    const instructor = await Instructor.findOne({ email: email });
    console.log(instructor);
       
    if (!instructor) {
        res.status(404).send('Not Found');
    }

    const isPasswordValid = bcrypt.compareSync(password, instructor.hash);
    if (!isPasswordValid) {
        return res.status(400).send('Password is incorrect');
    }

    const token = jwt.sign({ id: instructor._id, role: instructor.role }, secretKey, {
        expiresIn: '24h'  
    });
    console.log(token);

    res.status(200).json({user:instructor,token: token});
}
catch(error){
    console.log(error);
    res.status(500).send('Internal server error');
}
}
   
async function logout(req , res , next) {
    
    try {
      console.log('logout',req.body._id);
      let instructor = await Instructor.findById(req.body._id);
      console.log(instructor);
      await Instructor.findByIdAndUpdate(instructor._id,{}, { new: true });
    } 
  catch (error) {
    throw createError(400, 'Error logging out');
  }
  }

  function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
     if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        req.userId = decoded.id;
        next();
    });
}


module.exports={
    findAll: findAll,
    addInstructor: addInstructor,
    findById: findById,
    deleteById: deleteById,
    updateById: updateById,
    login: login,
    logout: logout,
    verifyToken: verifyToken
}