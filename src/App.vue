<template>
  <v-app>
    <div id="app">
      <Dashboard />
    </div>
  </v-app>
</template>

<script>
import Dashboard from "./scenes/Dashboard";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style></style>
