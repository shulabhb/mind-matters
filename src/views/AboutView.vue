<template>
  <div class="about">
  
    <div class="home-icon" @click="goToHome">
      <i class="material-icons">home</i>
    </div>

    
    <h1>About MindMatters</h1>
    <p>
      MindMatters is your companion for mental well-being. Our mission is to help individuals
      achieve better mental health through tools, resources, and a supportive community.
    </p>

  
    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        At MindMatters, we aim to bridge the gap between mental health awareness and actionable
        support. Our mission is to provide an accessible platform where users can cultivate
        emotional intelligence, foster personal growth, and build healthier relationships.
      </p>
    </section>

   
    <section class="services">
      <h2>Our Services</h2>
      <div class="service-cards">
        <div class="service-card">
          <h3>Mood Tracking</h3>
          <p>
            Log your daily emotions and visualize trends to better understand your mental health
            journey.
          </p>
        </div>
        <div class="service-card">
          <h3>Expert Resources</h3>
          <p>
            Access a curated library of mental health articles, guides, and self-care tips written
            by experts.
          </p>
        </div>
        <div class="service-card">
          <h3>Community Support</h3>
          <p>
            Join a safe and supportive space where users can connect, share experiences, and offer
            encouragement.
          </p>
        </div>
      </div>
    </section>

  
    <button class="home-button" @click="goToHome">Home</button>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";

export default {
  name: "AboutView",
  methods: {
    goToHome() {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        this.$router.push("/dashboard"); // Redirect to Dashboard if logged in
      } else {
        this.$router.push("/"); // Redirect to Home for non-logged-in users
      }
    } catch (error) {
      console.error("Error in goToHome:", error.message);
      this.$router.push("/"); // Fallback to Home if Firebase isn't initialized
    }
  },
  },
};
</script>




<style scoped>

.home-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

.material-icons {
  font-size: 30px;  
  color: #21a9ac;
  transition: color 0.3s;
}

.material-icons:hover {
  color: #189e96;
}

 
.about {
  text-align: center;
  padding: 20px;
  margin: 0 auto;
  max-width: 1000px;
  color: #e0e0e0;
}

 
.about h1 {
  font-size: 3rem;
  color: #110005;
  margin-bottom: 20px;
}

.about p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #84798e;
  margin-bottom: 20px;
}

 
.mission {
  background-color: #205559;
  padding: 30px;
  margin-top: 20px;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.mission:hover {
  transform: translateY(-10px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.mission h2 {
  font-size: 2rem;
  color: #01100d;
  margin-bottom: 15px;
}

.mission p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #000509;
}

 
.services {
  margin-top: 40px;
}

.services h2 {
  font-size: 2rem;
  color: #51aab1;
  margin-bottom: 20px;
}

.service-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.service-card {
  background-color: #2a515d;
  padding: 20px;
  border-radius: 10px;
  width: 280px;
  text-align: center;
  color: #e0e0e0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
}

.service-card h3 {
  font-size: 1.5rem;
  color: #d09816;
  margin-bottom: 10px;
}

.service-card p {
  font-size: 1rem;
  line-height: 1.5;
  color: #c0c0c0;
}

 
.home-button {
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #4f8eb8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.home-button:hover {
  background-color: #7b4797;
  transform: translateY(-3px);
}
</style>
