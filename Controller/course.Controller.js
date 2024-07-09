const mongoose = require('mongoose');
const Course = require('../Models/course.model.js');
const Instructor = require('../Models/instructor.model.js');
const Schedule = require('../Models/schedule.model.js');

async function findAll(req, res, next){

    try {
        const courses= await Course.find();
        console.log(courses);
        res.json(courses);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function addCourse(req, res, next){
    console.log('Add course');
    const imageData = Buffer.from(req.body.image, 'base64');

    try {
        const courseData = {
            name: req.body.name,
            level: req.body.level,
            description: req.body.description,
            image: imageData,
        };
        //console.log(req.body);
        const course= new Course(courseData);
        const result = await course.save();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function findById(req, res, next){

    try {
        const id=req.params.id;
        const course= await Course.findById(id);
        console.log(course);
        res.json(course);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
async function deleteById(req, res, next){

    try {
        const id=req.params._id;
        const course= await Course.findByIdAndDelete(id, function (err, docs) {
          
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
        const course= await Course.findByIdAndUpdated( id, updates , options );
        console.log(course);
        res.json(course);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
module.exports={
    findAll: findAll,
    addCourse: addCourse,
    findById: findById,
    deleteById: deleteById,
    updateById: updateById
}