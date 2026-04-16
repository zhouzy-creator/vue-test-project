// 简单的状态管理（存在数据一致性问题）
let users = []
let currentUser = null
let loading = false

export const userStore = {
  // 获取用户列表
  getUsers() {
    return users
  },

  // 设置用户列表
  setUsers(newUsers) {
    users = newUsers
  },

  // 获取当前用户
  getCurrentUser() {
    return currentUser
  },

  // 设置当前用户
  setCurrentUser(user) {
    currentUser = user
  },

  // 添加用户（存在竞态条件）
  addUser(user) {
    users.push(user)
  },

  // 更新用户
  updateUser(id, updates) {
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
    }
  },

  // 删除用户
  deleteUser(id) {
    users = users.filter(u => u.id !== id)
  },

  // 获取加载状态
  isLoading() {
    return loading
  },

  // 设置加载状态
  setLoading(value) {
    loading = value
  }
}
