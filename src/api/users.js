import axios from 'axios'

// 获取用户列表
export function getUsers() {
  return axios.get('/api/users')
    .then(res => res.data)
}

// 获取单个用户
export function getUserById(id) {
  return axios.get(`/api/users/${id}`)
    .then(res => res.data)
}

// 创建用户
export function createUser(userData) {
  return axios.post('/api/users', userData)
    .then(res => res.data)
}

// 更新用户
export function updateUser(id, userData) {
  return axios.put(`/api/users/${id}`, userData)
    .then(res => res.data)
}

// 删除用户
export function deleteUser(id) {
  return axios.delete(`/api/users/${id}`)
    .then(res => res.data)
}

// 搜索用户
export function searchUsers(query) {
  return axios.get('/api/users/search', { params: { q: query } })
    .then(res => res.data)
}
