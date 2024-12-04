<template>
    <div class="dashboard">
        <nav class="navbar">
            <div class="navbar-left">
                <img class="logo" :src="mindMattersImage" alt="MindMatters Logo" />
            </div>
            <div class="navbar-center">
                <h1>Welcome, {{ user.firstName || "Guest" }}!</h1>
            </div>
            <div class="navbar-right">
                <button @click="goTo('/dashboard')" title="Dashboard">
                    <span class="material-icons">home</span>
                </button>
                <button @click="goTo('/contact')" title="Contact Us">
                    <span class="material-icons">contact_support</span>
                </button>
                <button @click="goTo('/about')" title="About Us">
                    <span class="material-icons">info</span>
                </button>
                <button @click="logout" title="Log Out">
                    <span class="material-icons">logout</span>
                </button>
            </div>
        </nav>
        <div class="dashboard-content">
            <div class="left-column">
                <h3>Your Last Logged Mood</h3>
                <div v-if="lastMood" class="last-mood-card">
                    <h4>{{ lastMood.mood }}</h4>
                    <p>{{ lastMood.note || "No note added" }}</p>
                    <p><strong>Date:</strong> {{ lastMood.date }}</p>
                    <p><strong>Time:</strong> {{ lastMood.timestamp }}</p>
                </div>
                <div v-else>
                    <p>No moods logged yet. Start tracking your mood today!</p>
                </div>
                <div class="mood-stats" v-if="Object.keys(moodStats).length">
                    <h3>Mood Statistics</h3>
                    <div class="stat-item" v-for="(count, mood) in moodStats" :key="mood">
                        <span class="emoji">{{ moodEmojis[mood] }}</span>
                        <span class="mood-name">{{ mood }}</span>
                        <span class="mood-count">({{ count }})</span>
                    </div>
                </div>
            </div>
            <div class="right-column">
                <div class="services-intro">
                    <h2>Use Our Services</h2>
                    <p>
                        Explore tools and resources designed to help you monitor, manage, and
                        enhance your mental health.
                    </p>
                </div>
                <div class="dashboard-cards">
                    <dashboard-card title="Mood Tracker" description="Log your mood and track your mental health."
                        route="/mood-tracker" image="/moodTracker.png" />
                    <dashboard-card title="Mood History" description="View your past mood history patterns."
                        route="/mood-history" image="/moodHistory.png" />
                    <dashboard-card title="Explore Resources"
                        description="Discover mental health articles, exercises, and support." route="/resources"
                        image="/resources.png" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardCard from "../components/DashboardCard.vue";
import { getAuth, signOut } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";
import mindMattersImage from "../assets/mindMatters.png";

export default {
    name: "DashboardView",
    components: {
        DashboardCard,
    },
    data() {
        return {
            user: { firstName: "" },
            lastMood: null,
            moodStats: {},
            moodEmojis: {
                Happy: "😊",
                Sad: "😢",
                Neutral: "😐",
                Excited: "😄",
                Angry: "😡",
                Anxious: "😰",
                Panicking: "😱",
                Depressed: "😞",
                Lonely: "😔",
            },
            mindMattersImage,
        };
    },
    async created() {
        await this.fetchUserData();
        await this.fetchLastMood();
        await this.fetchMoodStats();
    },
    methods: {
        async fetchUserData() {
            try {
                const auth = getAuth();
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const userRef = doc(db, "users", userId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        this.user.firstName = userSnap.data().firstName;
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        },
        async fetchLastMood() {
            try {
                const auth = getAuth();
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const moodsRef = collection(db, "users", userId, "moods");
                    const q = query(moodsRef, orderBy("timestamp", "desc"), limit(1));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const lastMoodDoc = querySnapshot.docs[0];
                        const data = lastMoodDoc.data();
                        this.lastMood = {
                            mood: data.mood,
                            note: data.note,
                            date: data.date || new Date(data.timestamp.seconds * 1000).toLocaleDateString(),
                            timestamp: data.timestamp
                                ? new Date(data.timestamp.seconds * 1000).toLocaleTimeString()
                                : "Unknown Time",
                        };
                    }
                }
            } catch (error) {
                console.error("Error fetching last mood:", error.message);
            }
        },
        async fetchMoodStats() {
            try {
                const auth = getAuth();
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const moodsRef = collection(db, "users", userId, "moods");
                    const querySnapshot = await getDocs(moodsRef);
                    const stats = {};
                    querySnapshot.forEach((doc) => {
                        const mood = doc.data().mood;
                        if (mood) stats[mood] = (stats[mood] || 0) + 1;
                    });
                    this.moodStats = stats;
                }
            } catch (error) {
                console.error("Error fetching mood statistics:", error.message);
            }
        },
        goTo(route) {
            this.$router.push(route);
        },
        async logout() {
            const auth = getAuth();
            await signOut(auth);
            this.$router.push("/auth");
        },
    },
};
</script>


<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: linear-gradient(135deg, #246269, #000000);
    color: #e0e0e0;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
}

.navbar-left .logo {
    width: 200px;
    height: auto;
    border-radius: 20px;
}


.dashboard-content {
    display: flex;
    gap: 20px;
    padding: 20px;
    flex-wrap: wrap;
}


.left-column {
    flex: 1;
    background: #1d3e5a;
    color: #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
}

.last-mood-card {
    background: #4e7d96;
    padding: 15px;
    border-radius: 10px;
}

.mood-stats {
    background: #4e7d96;
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
    font-size: 1rem;
    color: #e0e0e0;
}

.stat-item .emoji {
    font-size: 1.5rem;
}


.dashboard-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.dashboard-card {
    flex: 1 1 calc(50% - 20px);
    max-width: 300px;
    background: #f4f4f4;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.dashboard-card:hover {
    transform: scale(1.05);
}
</style>