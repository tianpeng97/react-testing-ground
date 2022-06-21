import axios from 'axios'
const baseUrl = '/api/persons'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const add = async (newPerson) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newPerson, config)
  return res.data
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then((res) => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((res) => res.data)
}

const services = { getAll, add, update, remove, setToken }

export default services
