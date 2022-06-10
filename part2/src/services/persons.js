import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const add = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then((res) => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((res) => res.data)
}

const services = { getAll, add, remove }

export default services