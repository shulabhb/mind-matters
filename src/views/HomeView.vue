<template>
  <div class="home">
    <h1>YOUR MENTAL HEALTH PIT STOP</h1>
    <img class="mindmatters-image" :src="mindMattersImage" alt="MindMatters Logo" />
    <div class="about-section">
      <p class="tagline">' A companion for mental well-being '</p>
      <p class="author">By: Shulabh Bhattarai</p>
    </div>

    <div class="intro-section">
      <p>
        Welcome to <strong>MindMatters</strong>, your safe space for mental health. 
        Discover tools to track your emotions, access valuable resources, and 
        find support whenever you need it.
      </p>
      <p>
        Start your journey to a healthier mind today!
      </p>
    </div>

    <div class="nav-cards">
      <navigation-card 
        title="Log In or Sign Up" 
        description="Access your mood tracker, resources, and more."
        route="/auth"
      />
      <navigation-card 
        title="About Us" 
        description="Learn more about MindMatters and our mission."
        route="/about"
      />
      <navigation-card 
        title="Contact Us" 
        description="Have questions or feedback? Reach out to us."
        route="/contact"
      />
    </div>
  </div>
</template>

<script>
import NavigationCard from '../components/NavigationCard.vue';
import mindMattersImage from '../assets/mindMatters.png'; 

export default {
  name: 'HomeView',
  components: {
    NavigationCard,
  },
  data() {
    return {
      mindMattersImage,
    };
  },
};
</script>

<style scoped>
 
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #246269, #000000);  
  color: #e0750b;
}

h1 {
  color: #fefefe;
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

p {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 10px;
}
 
.about-section {
  margin: 20px 0;
}

.tagline {
  font-style: italic;
  font-size: 1.2rem;
  color: #21a9ac;
  margin-bottom: 5px;
}

.author {
  font-size: 0.9rem;
  color: #ccc;
}
 
.intro-section {
  max-width: 600px;
  margin-top: 20px;
  background: #1d3e5a;
  padding: 20px;
  border-radius: 10px;
  color: #e0e0e0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.intro-section p {
  margin: 10px 0;
}
 
.nav-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.navigation-card {
  width: 250px;
  padding: 15px;
  background: linear-gradient(135deg, #534c9b, #7d56d3);
  border-radius: 15px;
  color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.navigation-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.navigation-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.navigation-card p {
  font-size: 1rem;
}
 
.image-wrapper {
  display: inline-block;
  padding: 15px;  
  border: 10px solid rgb(245, 242, 242);  
  border-radius: 15px;  
  background-color: rgb(226, 216, 216);  
}

.mindmatters-image {
  display: block;
  width: 350px; 
  height: auto;
  border-radius: 25px;  
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .nav-cards {
    flex-direction: column;
    gap: 15px;
  }

  .navigation-card {
    width: 90%;
  }
}
</style>
