const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { info } = require('../utils/logger');
const User = require("../models/user");

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  const user = await User.findOne();
  if (user) {
    blog.user = user._id;
  }

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  info('here1');

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog =
      await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;