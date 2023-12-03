const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));

  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('id property is defined on a blog', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Promises, async/await part 5',
    author: 'JavaScript.info',
    url: 'https://javascript.info/promise-basics',
    likes: 12,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDb = await helper.blogsInDb();
  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsInDb.map(blog => {
    delete blog.id;
    return blog;
  });
  expect(contents).toContainEqual(newBlog);
});

afterAll(async () => {
  await mongoose.connection.close();
});