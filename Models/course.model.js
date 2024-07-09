const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer , required: true },
    //Batches: { type: Object },
    //[{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
}
);

module.exports = mongoose.model('Course', CourseSchema,'courses');