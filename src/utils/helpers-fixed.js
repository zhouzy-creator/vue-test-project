/**
 * 工具函数库 - 修复版本
 */

// 格式化日期
export function formatDate(date, format = 'YYYY-MM-DD') {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

// 验证邮箱
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email.trim())
}

// 深拷贝（安全版本，支持循环引用）
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item))
  }

  if (obj instanceof Set) {
    return new Set([...obj].map(item => deepClone(item)))
  }

  if (obj instanceof Map) {
    return new Map([...obj].map(([k, v]) => [deepClone(k), deepClone(v)]))
  }

  if (obj instanceof Object) {
    const cloned = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }

  return obj
}

// 防抖函数（正确实现）
export function debounce(func, wait = 300, immediate = false) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  let timeoutId = null

  return function debounced(...args) {
    const context = this

    const later = () => {
      timeoutId = null
      if (!immediate) {
        func.apply(context, args)
      }
    }

    const callNow = immediate && timeoutId === null

    clearTimeout(timeoutId)
    timeoutId = setTimeout(later, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }
}

// 节流函数（正确实现）
export function throttle(func, delay = 300) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  let lastTime = 0
  let timeoutId = null

  return function throttled(...args) {
    const context = this
    const now = Date.now()

    const remaining = delay - (now - lastTime)

    if (remaining <= 0 || remaining > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastTime = now
      func.apply(context, args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now()
        timeoutId = null
        func.apply(context, args)
      }, remaining)
    }
  }
}

// 安全的随机 ID 生成
export function generateId(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => chars[byte % chars.length]).join('')
}

// 本地存储封装（带错误处理）
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  }
}

// 防 XSS 清理函数
export function sanitizeHtml(str) {
  if (!str || typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// URL 参数编码
export function encodeUrlParam(str) {
  if (!str) return ''
  return encodeURIComponent(String(str))
    .replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
}

// 格式化货币
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}
