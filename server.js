const express = require('express');
const dotenv = require('dotenv').config();
var cors = require('cors');
const bodyParser = require('body-parser')
const connectDB=require('./Config/db')

const app = express();

// app.use(cors({
//   origin: '*',
//   credentials: true  // if you're using cookies or sessions
// }));
// app.options('*', cors());
app.use(cors({
  origin: '*',
  credentials: true,  // if you're using cookies or sessions
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Ensure CORS preflight requests are handled
app.options('*', cors());

//app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
console.log("DB");

app.use('/api/instructors', require('./Routes/instructor.route'));
app.use('/api/courses', require('./Routes/course.route'));
app.use('/api/schedule', require('./Routes/schedule.route'));


// app.use((err, req, res, next) => {
//   // console.log(req);
//   res.status(err.status || 500);
//   res.send({
//     error: {
//       status: err.status || 500,
//       message: err.message
//     }
//   });
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});


