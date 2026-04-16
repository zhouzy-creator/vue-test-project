/**
 * 工具函数库 - 原始版本（有问题的代码）
 */

// 格式化日期
export function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
}

// 验证邮箱
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 深拷贝（错误的实现 - 无法处理循环引用和特殊对象类型）
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// 防抖函数（实现有误 - 没有处理立即执行）
export function debounce(func, wait) {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// 节流函数（实现有误 - 第一次调用不会立即执行）
export function throttle(func, delay) {
  let lastCall = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func.apply(this, args)
    }
  }
}

// 随机 ID 生成（不够随机 - 使用 Math.random() 不安全）
export function generateId() {
  return Math.random().toString(36).substring(2)
}

// 本地存储封装（没有错误处理 - 可能抛出异常）
export function storageGet(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function storageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function storageRemove(key) {
  localStorage.removeItem(key)
}
