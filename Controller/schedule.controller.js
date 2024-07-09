const mongoose = require('mongoose');
const Course = require('../Models/course.model.js');
const Instructor = require('../Models/instructor.model.js');
const Schedule = require('../Models/schedule.model.js');
const { response } = require('express');

async function findAll(req, res, next){

    try {
        const schedules= await Schedule.find();
        console.log(schedules);
        res.json(schedules);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function addSchedule(req, res, next){

    try {
        const schedules = req.body; 
        console.log(schedules)
            const { name, date } = schedules;
        console.log(name,date);
            const existingSchedule = await Schedule.findOne({ name, date });
        console.log(existingSchedule)
            if (existingSchedule) {
                return res.status(400).json({message:`Lecture has already been assigned to ${name} on ${date}`});
            }
        const schedule= new Schedule(req.body);
        const result = await schedule.save();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

async function findById(req, res, next){
console.log(req.body,req.params.id)
const name=req.body.name;
    try {
        const id=req.params.id;
        const schedule= await Schedule.find({name:name});
        console.log(schedule);
        res.json(schedule);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
async function deleteById(req, res, next){

    try {
        const id=req.params.id;
        const schedule= await Schedule.findByIdAndDelete(id, function (err, docs) {
          
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
        const schedule= await Schedule.findByIdAndUpdated( id, updates , options );
        console.log(schedule);
        res.json(schedule);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
module.exports={
    findAll: findAll,
    addSchedule: addSchedule,
    findById: findById,
    deleteById: deleteById,
    updateById: updateById
}