const { dummy, totalLikes, favoriteBlog, mostBlogs } = require('../utils/list_helper');
const { initialBlogs } = require('./test_helper');

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const manyBlogs = initialBlogs;

test('dummy returns one', () => {
  const blogs = [];

  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(manyBlogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('finds out which blog has the most likes', () => {
    const result = favoriteBlog(manyBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

test('finds out which author has the most blogs', () => {
  const result = mostBlogs(manyBlogs);

  expect(result).toEqual({
    author: 'Robert C. Martin',
    blogs: 3,
  });
});

