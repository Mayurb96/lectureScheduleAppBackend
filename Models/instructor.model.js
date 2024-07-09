const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    hash: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    lectures: { type: Array },
    date: { type: String },
    courseName: { type: String, required: true },
    courseLevel: { type: String, required: true },
    role: { type: String, default: 'instructor'},
}
);

module.exports = mongoose.model('Instructor', InstructorSchema,'instructors');