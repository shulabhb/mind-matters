<template>
    <div class="mood-history">
      
      <button class="home-button" @click="goToDashboard">
        <span class="material-icons">home</span> Home
      </button>
  
      <h1>Mood History</h1>
  
       
      <section class="filters">
        <label for="filter">Filter by Mood:</label>
        <select id="filter" v-model="filter">
          <option value="">All Moods</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Neutral">Neutral</option>
          <option value="Excited">Excited</option>
          <option value="Angry">Angry</option>
          <option value="Anxious">Anxious</option>
          <option value="Panicking">Panicking</option>
          <option value="Depressed">Depressed</option>
          <option value="Lonely">Lonely</option>
          <option value="Overwhelmed">Overwhelmed</option>
          <option value="Grateful">Grateful</option>
        </select>
  
        <button @click="toggleSortOrder">
          Sort: {{ sortOrder === "asc" ? "Oldest First" : "Newest First" }}
        </button>
      </section>
  
      <!-- Loading Indicator -->
      <section v-if="loading" class="loading">
        Loading mood history...
      </section>
  
      <!-- No Entries Message -->
      <section v-else-if="filteredMoods.length === 0" class="no-entries">
        No mood entries found.
      </section>
  
      <!-- Mood Entries -->
      <section v-else class="entries">
        <div v-for="(moodGroup, date) in groupedMoods" :key="date" class="date-group">
          <h2 @click="toggleDateGroup(date)" class="date-header">
            <span class="material-icons">
              {{ collapsedDates[date] ? "expand_more" : "expand_less" }}
            </span>
            {{ date }}
          </h2>
          <div v-if="!collapsedDates[date]" class="moods-container">
            <div v-for="mood in moodGroup" :key="mood.id" :class="['mood-card', mood.mood.toLowerCase()]">
              <div class="mood-header">
                <strong>{{ mood.mood }}</strong>
                <small>{{ mood.day }} {{ mood.date }} at {{ mood.timestamp }}</small>
              </div>
              <p v-if="mood.note">{{ mood.note }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import { useRouter } from "vue-router";
  import { getAuth } from "firebase/auth";
  import { db } from "../firebase/init";
  import { collection, query, getDocs, orderBy } from "firebase/firestore";
  
  export default {
    name: "MoodHistoryView",
    data() {
      return {
        moods: [],
        loading: true,
        filter: "",  
        sortOrder: "desc",  
        collapsedDates: {},  
      };
    },
    computed: {
      // Filtering moods based on the selected mood filter
      filteredMoods() {
        return this.filter
          ? this.moods.filter((mood) => mood.mood === this.filter)
          : this.moods;
      },
      // Grouping moods by date 
      groupedMoods() {
        const grouped = {};
        this.filteredMoods.forEach((mood) => {
          const date = mood.date || "Unknown Date";
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(mood);
        });
        return grouped;
      },
    },
    watch: {
       
      sortOrder(newValue) {
        this.fetchMoodHistory();
      },
      
      filter(newValue) {
      },
    },
    async created() {
      await this.fetchMoodHistory();
    },
    methods: {
      goToDashboard() {
        this.router.push("/dashboard");
      },
      // Fetch the mood history from Firestore based on the selected sort order
      async fetchMoodHistory() {
        const auth = getAuth();
        const userId = auth.currentUser.uid;
  
        try {
          this.loading = true;
          const moodsRef = collection(db, "users", userId, "moods");
          const q = query(moodsRef, orderBy("timestamp", this.sortOrder));
          const querySnapshot = await getDocs(q);
  
          this.moods = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const timestamp = new Date(data.timestamp.seconds * 1000);
  
            // Get day, date, and time from the timestamp
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            const fullDate = timestamp.toLocaleDateString(undefined, options);
            const time = timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
            return {
              id: doc.id,
              ...data,
              day: timestamp.toLocaleDateString(undefined, { weekday: "long" }),
              date: timestamp.toLocaleDateString(),
              timestamp: time,
            };
          });
        } catch (error) {
          console.error("Error fetching mood history:", error.message);
        } finally {
          this.loading = false;
        }
      },
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      },
      toggleDateGroup(date) {
        this.$set(this.collapsedDates, date, !this.collapsedDates[date]);
      },
    },
    setup() {
      const router = useRouter();
      return { router };
    },
  };
  </script>
  
  <style scoped>
  .mood-history {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .filters label {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .filters select,
  .filters button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .entries .date-group {
    margin-top: 20px;
  }
  
  .date-header {
    cursor: pointer;
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .moods-container {
    padding-left: 15px;
  }
  
  .mood-card {
    background-color: #1d3e5a;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    text-align: left;
  }
  
  .mood-card .mood-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
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
  </style>
  