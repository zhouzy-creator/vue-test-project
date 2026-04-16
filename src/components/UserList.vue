<template>
  <div class="user-list">
    <h2>User List</h2>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search users..." @input="handleSearch" />
      <button @click="handleSearch">Search</button>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-else class="users">
      <div v-for="user in filteredUsers" :key="user.id" class="user-card" @click="goToProfile(user.id)">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <p>Role: {{ user.role }}</p>
        <button @click.stop="deleteUser(user.id)">Delete</button>
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { debounce, validateEmail } from '../utils/helpers'

export default {
  name: 'UserList',
  setup() {
    const router = useRouter()
    const users = ref([])
    const searchQuery = ref('')
    const loading = ref(false)
    const page = ref(1)
    const pageSize = 10

    // 缺少权限检查
    const fetchUsers = async () => {
      loading.value = true
      try {
        // 直接使用用户输入拼接到 URL（XSS 风险）
        const response = await axios.get(`/api/users?q=${searchQuery.value}&page=${page.value}`)
        users.value = response.data
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredUsers = computed(() => {
      if (!searchQuery.value) return users.value
      return users.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const handleSearch = debounce(() => {
      fetchUsers()
    }, 300)

    const goToProfile = (id) => {
      router.push(`/profile/${id}`)
    }

    const deleteUser = async (id) => {
      // 没有确认对话框，可能误删
      try {
        await axios.delete(`/api/users/${id}`)
        fetchUsers()
      } catch (error) {
        console.error('Delete failed:', error)
      }
    }

    const prevPage = () => {
      if (page.value > 1) {
        page.value--
        fetchUsers()
      }
    }

    const nextPage = () => {
      page.value++
      fetchUsers()
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      searchQuery,
      loading,
      page,
      filteredUsers,
      handleSearch,
      goToProfile,
      deleteUser,
      prevPage,
      nextPage
    }
  }
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
.search-bar input {
  padding: 8px;
  margin-right: 10px;
}
.user-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
}
.user-card:hover {
  background-color: #f5f5f5;
}
.pagination {
  margin-top: 20px;
}
button {
  padding: 8px 16px;
  cursor: pointer;
}
</style>
