<template>
    <div class="resource-card">
      <img v-if="image" :src="image" alt="Resource Image" class="resource-image" />
      <div class="resource-content">
        <h2 class="resource-title">{{ title }}</h2>
        <p class="resource-description">{{ description }}</p>
        <a :href="source" target="_blank" rel="noopener noreferrer" class="resource-link">
          Explore Now
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ResourceCard",
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      source: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: null,  
      },
    },
  };
  </script>
  
  <style scoped>
  .resource-card {
    width: 300px;
    background: #1d3e5a;
    color: #e0e0e0;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
  
  .resource-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .resource-content {
    padding: 20px;
    text-align: left;
  }
  
  .resource-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .resource-description {
    font-size: 1rem;
    margin-bottom: 15px;
    color: #b0c4de;
  }
  
  .resource-link {
    text-decoration: none;
    font-weight: bold;
    color: #21a9ac;
    transition: color 0.3s;
  }
  
  .resource-link:hover {
    color: #53c6d4;
  }
  </style>
  