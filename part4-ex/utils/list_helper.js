const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.likes
  return blogs.reduce(reducer, 0)
}

module.exports = { dummy, totalLikes }
