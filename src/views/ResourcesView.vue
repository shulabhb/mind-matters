<template>
    <div class="resources">
       <button class="home-button" @click="goToDashboard">
        <span class="material-icons">home</span> Home
      </button>
  
      <h1>Explore Resources</h1>
  
       <div v-if="loading" class="loading-indicator">
        Loading resources...
      </div>
  
       <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="retryFetch">Retry</button>
      </div>
  
       
      <div v-if="!loading && !error" class="resources-container">
        <resource-card
          v-for="resource in resources"
          :key="resource.id"
          :title="resource.title"
          :description="resource.description"
          :source="resource.source"
          :image="resource.image"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { useResourceStore } from "../stores/resourceStore";
  import ResourceCard from "../components/ResourceCard.vue";
  import { useRouter } from "vue-router";
  import { computed, onMounted } from "vue";
  
  export default {
    name: "ResourcesView",
    components: {
      ResourceCard,
    },
    setup() {
      const resourceStore = useResourceStore();
      const router = useRouter();
      const resources = computed(() => resourceStore.resources);
      const loading = computed(() => resourceStore.loading);
      const error = computed(() => resourceStore.error);
  
      const fetchResourcesOnLoad = async () => {
        if (!resources.value.length) {
          // Only fetch if resources are empty
          await resourceStore.fetchResources();
        }
      };
  
      const goToDashboard = () => {
        router.push("/dashboard");
      };
  
      const retryFetch = async () => {
        await resourceStore.fetchResources();
      };
  
      // Fetch resources on mount
      onMounted(fetchResourcesOnLoad);
  
      return {
        resources,
        loading,
        error,
        retryFetch,
        goToDashboard,
      };
    },
  };
  </script>
  
  
  <style scoped>
  .resources {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  
  .resources h1 {
    font-size: 2.5rem;
    color: #21a9ac;
    margin-bottom: 20px;
  }
  
  .resources-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .home-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #534c9b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #7d56d3;
  }
  
  .loading-indicator {
    color: #21a9ac;
    font-size: 1.2rem;
    margin: 20px 0;
  }
  
  .error-message {
    color: red;
    font-size: 1rem;
    margin: 20px 0;
  }
  
  .error-message button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #f44e3b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .error-message button:hover {
    background-color: #e63b28;
  }
  
  .material-icons {
    font-size: 1.2rem;
    vertical-align: middle;
  }
  </style>
  