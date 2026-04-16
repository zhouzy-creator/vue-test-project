<template>
  <div id="app">
    <header>
      <h1>Vue Code Review Demo</h1>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/profile">Profile</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
header {
  background: #333;
  color: white;
  padding: 15px;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
nav a.router-link-active {
  color: #42b983;
}
main {
  padding: 20px;
}
</style>
