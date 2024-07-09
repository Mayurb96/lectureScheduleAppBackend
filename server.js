const express = require('express');
const dotenv = require('dotenv').config();
var cors = require('cors');
const bodyParser = require('body-parser')
const connectDB=require('./Config/db')

const app = express();
const allowedOrigins = ['https://lecture-schedulings-app.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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


