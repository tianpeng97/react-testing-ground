const _ = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let favorite = 0
  let maxLikes = 0
  for (let blog = 0; blog < blogs.length; blog++) {
    const element = blogs[blog]
    if (element.likes > maxLikes) {
      maxLikes = element.likes
      favorite = blog
    }
  }
  const { _id, url, __v, ...result } = blogs[favorite]
  return result
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const result = _(blogs).countBy('author').toPairs().maxBy(_.last)

  return { author: result[0], blogs: result[1] }
}

module.exports = { totalLikes, favoriteBlog, mostBlogs }
