const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    name:{ type: String, required: true }, 
    //{ type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
    course: { type: Array, required: true },
    //{ type: Schema.Types.ObjectId, ref: 'Course', required: true },
    date: { type: String, required: true },

}
);

module.exports = mongoose.model('Schedule', ScheduleSchema,'schedules');