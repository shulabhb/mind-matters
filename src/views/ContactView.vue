<template>
    <div class="contact">
     
      <div class="home-icon" @click="goToHome">
        <i class="material-icons">home</i>
      </div>
  
       
      <h1>Contact Us</h1>
      <p>Have questions or feedback? We'd love to hear from you!</p>
  
       
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            placeholder="Write your message"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase/init";  
  import { getAuth } from "firebase/auth";
  
  export default {
    name: "ContactView",
    data() {
      return {
        formData: {
          name: "",
          email: "",
          message: "",
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          // Save the form data to Firestore
          await addDoc(collection(db, "contactMessages"), {
            name: this.formData.name,
            email: this.formData.email,
            message: this.formData.message,
            timestamp: new Date(), // Adding a timestamp for sorting or display purposes
          });
  
           
          alert(`Thank you, ${this.formData.name}! We have received your message.`);
          this.formData = { name: "", email: "", message: "" };
        } catch (error) {
          console.error("Error submitting contact form:", error.message);
          alert("There was an error submitting your message. Please try again.");
        }
      },
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
  .contact {
    text-align: center;
    padding: 20px;
    margin: 0 auto;
    max-width: 800px;
    color: #e0e0e0;
  }
  .contact h1 {
    font-size: 2.5rem;
    color: #21a9ac;
    margin-bottom: 20px;
  }
  .contact p {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #b0b0b0;
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #6d7e88;  
  }
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #534c9b;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #7d56d3;
  }
  </style>
  