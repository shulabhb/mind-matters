<template>
    <div class="nav-card" @click="navigate">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavigationCard',
    props: {
      title: {
        type: String,
        required: true,  
      },
      description: {
        type: String,
        required: true,  
      },
      route: {
        type: String,
        required: true,  
      },
    },
    methods: {
      navigate() {
        this.$router.push(this.route); 
      },
    },
  };
  </script>
  
  <style scoped>
  .nav-card {
    width: 200px;
    padding: 20px;
    border: 1.5px solid #080000;
    border-radius: 30px;
    background-color: #45887e;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .nav-card:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #70973d;
  }
  .nav-card h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #080808;
  }
  .nav-card p {
    font-size: 14px;
    color: #333;
  }
  </style>
  