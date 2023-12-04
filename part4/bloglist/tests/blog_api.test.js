const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
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

test('a blog can be added with likes defaults to 0 if likes property is missing from request', async () => {
  const newBlog = {
    title: 'Promises, async/await part 5',
    author: 'JavaScript.info',
    url: 'https://javascript.info/promise-basics',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsInDb = await helper.blogsInDb();
  const contents = blogsInDb.map(blog => {
    delete blog.id;
    return blog;
  });
  expect(contents).toContainEqual({
    ...newBlog,
    likes: 0,
  })
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});