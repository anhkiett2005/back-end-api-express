const useRouter = require('./Router/index')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const port = 3000;

dotenv.config();

//Connnecttion db
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Error connecting to MongoDB');
  }
}

connectDb();


// Sử dụng CORS Middleware
app.use(cors()); // Cho phép tất cả các nguồn truy cập vào API

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Logger middleware
app.use(morgan('common'));

// Routes
app.use('/api',useRouter);

// Middleware để xử lý tất cả các route không khớp (route không tồn tại)
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
