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
  if (blogs.length === 0) return undefined

  const result = _(blogs).countBy('author').toPairs().maxBy(_.last())

  return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const reducer = (previousValue, currentValue) =>
    previousValue + currentValue.likes

  const result = _(blogs)
    .groupBy('author')
    .map((authorBlogs) => {
      const likes = authorBlogs.reduce(reducer, 0)
      return { author: authorBlogs[0].author, likes: likes }
    })
    .maxBy('likes')
  return result
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }
