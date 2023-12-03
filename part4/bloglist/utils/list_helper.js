const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((runningSum, num) => runningSum + num, 0);
}

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}