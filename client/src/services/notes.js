import axios from 'axios'

const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = (id) => {
  const request = axios.get(baseUrl + `/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, title, content, important) => {
  const request = axios.put(baseUrl + `/${id}`, { title: title, content: content, important: important })
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(baseUrl + `/${id}`)
  return request.then(response => response.data)
}

export default { getAll, get, create, update, remove }