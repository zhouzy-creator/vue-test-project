<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="user">
      <div class="profile-header">
        <img :src="user.avatar" alt="Avatar" class="avatar" />
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Role: {{ user.role }}</p>
      </div>

      <div class="profile-content">
        <h4>Activity History</h4>
        <div v-for="(activity, index) in user.activities" :key="index" class="activity-item">
          {{ activity }}
        </div>
      </div>

      <div class="profile-actions">
        <button @click="editProfile">Edit Profile</button>
        <button @click="changePassword">Change Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { generateId } from '../utils/helpers'

export default {
  name: 'UserProfile',
  setup() {
    const route = useRoute()
    const user = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // 性能问题：没有缓存，重复请求
    const fetchUser = async () => {
      loading.value = true
      error.value = null
      try {
        const id = route.params.id
        // 每次都发起新请求，即使数据可能没变
        const response = await axios.get(`/api/users/${id}`)
        user.value = response.data

        // 不必要的重复请求
        setTimeout(() => {
          axios.get(`/api/users/${id}`)
        }, 100)
      } catch (err) {
        error.value = 'Failed to load user profile'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // 内存泄漏：定时器没有清理
    let timer = setInterval(() => {
      if (user.value) {
        console.log('User is active:', user.value.name)
      }
    }, 5000)

    const editProfile = () => {
      // 没有实际的编辑功能实现
      alert('Edit feature coming soon!')
    }

    const changePassword = () => {
      // 简单的密码提示，不安全
      const password = prompt('Enter new password:')
      if (password) {
        axios.post(`/api/users/${user.value.id}/password`, { password })
      }
    }

    onMounted(() => {
      fetchUser()
    })

    // 缺少路由参数变化的监听
    watch(() => route.params.id, () => {
      fetchUser()
    })

    return {
      user,
      loading,
      error,
      editProfile,
      changePassword
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
}
.profile-header {
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.activity-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.profile-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
