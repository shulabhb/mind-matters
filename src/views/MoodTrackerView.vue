<template>
    <div class="mood-tracker">
       <button class="home-button" @click="goToDashboard">
        <span class="material-icons">home</span> Go Back
      </button>
  
      <h1>Mood Tracker</h1>
  
       <section class="log-mood">
        <h2>Log Your Mood</h2>
        <form @submit.prevent="logMood">
          <div class="form-group">
            <label for="mood">Mood</label>
            <select id="mood" v-model="mood" required>
              <option value="" disabled>Select your mood</option>
              <option v-for="m in availableMoods" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="note">Note (optional)</label>
            <textarea id="note" v-model="note" placeholder="How are you feeling?"></textarea>
          </div>
          <button type="submit" :disabled="moodStore.loading">
            {{ moodStore.loading ? "Logging..." : "Log Mood" }}
          </button>
        </form>
      </section>
  
       <div v-if="moodStore.loading" class="loader">
        Loading...
      </div>
  
       <section class="mood-suggestions" v-if="suggestions.length && !moodStore.loading">
        <h2>Suggestions for your current Mood: {{ mood }}</h2>
        <ul>
          <li v-for="(suggestion, index) in suggestions" :key="index">
            {{ suggestion }}
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useMoodStore } from "../stores/moodStore";
  import { useUserStore } from "../stores/userStore";
  import { useRouter } from "vue-router";
  
  export default {
    name: "MoodTrackerView",
    setup() {
      const moodStore = useMoodStore();
      const userStore = useUserStore();
      const router = useRouter();
  
      const mood = ref("");
      const note = ref("");
      const suggestions = ref([]); //Adding reactive property for suggestions
  
      const availableMoods = [
        "Happy",
        "Sad",
        "Neutral",
        "Excited",
        "Angry",
        "Anxious",
        "Panicking",
        "Depressed",
        "Lonely",
        "Overwhelmed",
        "Grateful",
      ];
  
      onMounted(async () => {
        if (!userStore.user) {
          console.log("Fetching user...");
          await userStore.fetchUser();
        }
        if (!userStore.isAuthenticated) {
          alert("Please log in to access the Mood Tracker.");
          router.push("/auth");
        }
      });
  
      const logMood = async () => {
        try {
          const userId = userStore.user?.id;
          if (!userId) {
            alert("Please log in before logging your mood.");
            return;
          }
  
          console.log("Logging mood for user:", userId);
          await moodStore.logMood(userId, mood.value, note.value);
  
          // Fetch suggestions and update local reactive property
          await moodStore.fetchSuggestions(mood.value);
          suggestions.value = [...moodStore.suggestions];
          console.log("Suggestions fetched:", suggestions.value);
  
          // Alert user about success
          alert("Mood logged successfully!");
  
          // Reset the form
          mood.value = "";
          note.value = "";
        } catch (error) {
          console.error("Error logging mood:", error);
          alert("An error occurred while logging your mood. Please try again.");
        }
      };
  
      const goToDashboard = () => {
        router.push("/dashboard");  
      };
  
      return {
        moodStore,
        userStore,
        router,
        logMood,
        goToDashboard,
        mood,
        note,
        suggestions, 
        availableMoods,  
      };
    },
  };
  </script>
  
  <style scoped>
  .mood-tracker {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .log-mood {
    margin-top: 20px;
  }
  
  form .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  form label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  form select,
  form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  
  button {
    padding: 10px 20px;
    background-color: #534c9b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #7d56d3;
  }
  
  button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
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
  
  .material-icons {
    font-size: 1.2rem;
    vertical-align: middle;
  }
  
  .mood-suggestions {
    margin-top: 20px;
  }
  
  .mood-suggestions ul {
    list-style: none;
    padding: 0;
  }
  
  .mood-suggestions li {
    background-color: #615968;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    color: white;
  }
  
  .loader {
    margin: 20px 0;
    font-size: 1.2rem;
    color: #534c9b;
  }
  </style>
  