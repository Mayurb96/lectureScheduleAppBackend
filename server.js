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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://lecture-schedulings-app.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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


