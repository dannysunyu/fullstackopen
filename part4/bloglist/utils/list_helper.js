const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((runningSum, num) => runningSum + num, 0);
}

module.exports = {
  dummy,
  totalLikes,
}