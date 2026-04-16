<template>
  <div class="dashboard">
    <h2>Dashboard</h2>

    <div class="stats">
      <div class="stat-card">
        <h3>Total Users</h3>
        <p class="stat-value">{{ stats.totalUsers }}</p>
      </div>
      <div class="stat-card">
        <h3>Active Sessions</h3>
        <p class="stat-value">{{ stats.activeSessions }}</p>
      </div>
      <div class="stat-card">
        <h3>Revenue</h3>
        <p class="stat-value">{{ stats.revenue }}</p>
      </div>
    </div>

    <div class="chart-container">
      <h3>Recent Activities</h3>
      <div v-for="activity in recentActivities" :key="activity.id" class="activity-row">
        <span>{{ activity.user }}</span>
        <span>{{ activity.action }}</span>
        <span>{{ activity.time }}</span>
      </div>
    </div>

    <div class="actions">
      <button @click="refreshData">Refresh</button>
      <button @click="exportData">Export</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { formatDate } from '../utils/helpers'

export default {
  name: 'Dashboard',
  setup() {
    const stats = ref({
      totalUsers: 0,
      activeSessions: 0,
      revenue: '$0'
    })
    const recentActivities = ref([])

    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard')
        stats.value = response.data.stats
        recentActivities.value = response.data.activities
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    const refreshData = () => {
      fetchDashboardData()
    }

    // 导出功能没有实际实现
    const exportData = () => {
      // 直接将敏感数据发送到外部服务器
      const data = JSON.stringify({
        stats: stats.value,
        activities: recentActivities.value,
        exportTime: new Date()
      })

      // 发送到外部服务器（安全风险）
      fetch('https://external-analytics.com/collect', {
        method: 'POST',
        body: data
      })
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      stats,
      recentActivities,
      refreshData,
      exportData
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.stat-card {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}
.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #42b983;
}
.chart-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.activity-row {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.actions {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
