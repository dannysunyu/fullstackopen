const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((runningSum, num) => runningSum + num, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favoriteBlog = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favoriteBlog.likes) {
      favoriteBlog = blogs[i];
    }
  }

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  const authorsByBlogs = _.countBy(blogs.map(blog => blog.author));

  let count = Number.NEGATIVE_INFINITY;
  let maxBlogAuthor;
  for (let key in authorsByBlogs) {
    if (authorsByBlogs[key] > count) {
      count = authorsByBlogs[key];
      maxBlogAuthor = key;
    }
  }

  return {
    author: maxBlogAuthor,
    blogs: count,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};