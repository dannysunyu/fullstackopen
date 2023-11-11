const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

mongoose.set('strictQuery', false);

const mongoUrl = 'mongodb+srv://sunnyhust2005:Db78398k@cluster0.qg2amgu.mongodb.net/bloglist?retryWrites=true&w=majority';
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});