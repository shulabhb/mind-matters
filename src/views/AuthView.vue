<template>
    <div class="auth">
        <div class="home-icon" @click="goToHome">
            <i class="material-icons">home</i>
        </div>
        <div class="image-container">
            <img class="mindmatters-image" :src="mindMattersImage" alt="MindMatters Logo" />
        </div>
        <div class="auth-options">
            <button @click="isLogin = true" :class="{ active: isLogin }">Log In</button>
            <button @click="isLogin = false" :class="{ active: !isLogin }">Sign Up</button>
        </div>
        <h1>{{ isLogin ? "Welcome Back!" : "Let's Get Started!" }}</h1>
        <p>{{ isLogin ? "Log in to access your account." : "Sign up to join MindMatters!" }}</p>

        <!-- Success and Error Messages -->
        <div v-if="successMessage" class="success-message">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>

        <!-- Loading View Message -->
        <div v-if="isLoading" class="loader">
            Processing...
        </div>

        <form @submit.prevent="handleAuth">
            <div class="form-group" v-if="!isLogin">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" v-model="formData.firstName" placeholder="Enter your first name"
                    required />
            </div>
            <div class="form-group" v-if="!isLogin">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" v-model="formData.lastName" placeholder="Enter your last name"
                    required />
            </div>
            <div class="form-group" v-if="!isLogin">
                <label for="gender">Gender</label>
                <select id="gender" v-model="formData.gender" required>
                    <option value="" disabled>Select your gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group" v-if="!isLogin">
                <label for="dob">Date of Birth</label>
                <input type="date" id="dob" v-model="formData.dob" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="formData.password" placeholder="Enter your password"
                    required />
            </div>
            <button type="submit" :disabled="isLoading">
                {{ isLogin ? "Log In" : "Sign Up" }}
            </button>
        </form>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from "../firebase/init";
import mindMattersImage from "../assets/mindMatters.png";

export default {
    name: "AuthView",
    data() {
        return {
            isLogin: true,
            mindMattersImage,
            formData: {
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                email: "",
                password: "",
            },
            successMessage: "",
            errorMessage: "",
            isLoading: false, // Initializing the loading state to false
        };
    },
    methods: {
        async handleAuth() {
            const auth = getAuth(app);
            this.successMessage = "";
            this.errorMessage = "";
            this.isLoading = true; // Start loading now
            if (this.isLogin) {
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, this.formData.email, this.formData.password);
                    this.successMessage = "Logged in successfully!";
                    // Redirect to the dashboard after a short delay to show the message for login further
                    setTimeout(() => {
                        this.$router.push("/dashboard");
                    }, 1000);
                } catch (error) {
                    this.errorMessage = "Authentication failed: " + error.message;
                } finally {
                    this.isLoading = false; // I used this finally to stop the loading indicator regardless of success or failure
                }
            } else {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password);
                    const userRef = doc(db, "users", userCredential.user.uid);
                    await setDoc(userRef, {
                        firstName: this.formData.firstName,
                        lastName: this.formData.lastName,
                        gender: this.formData.gender,
                        dob: this.formData.dob,
                        email: this.formData.email,
                        createdAt: serverTimestamp(),
                        lastLogin: serverTimestamp(),
                    });
                    this.successMessage = "Account created successfully! Please log in.";
                    this.isLogin = true; // Switch to Log In view
                    this.resetForm(); // Reset the form fields
                } catch (error) {
                    this.errorMessage = "Authentication failed: " + error.message;
                } finally {
                    this.isLoading = false; // I used this finally to stop the loading indicator regardless of success or failure
                }
            }
        },
        resetForm() {
            this.formData = {
                firstName: "",
                lastName: "",
                gender: "",
                dob: "",
                email: "",
                password: "",
            };
        },
        goToHome() {
            this.$router.push("/");
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


.auth {
    text-align: center;
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    color: #e0e0e0;
    background-color: #2c2c2c;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.image-container {
    margin-bottom: 20px;
}

.mindmatters-image {
    display: block;
    width: 300px;
    height: auto;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}


.auth-options {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.auth-options button {
    padding: 10px 20px;
    background-color: #534c9b;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.auth-options button.active {
    background-color: #7d56d3;
}

.auth-options button:hover {
    background-color: #7d56d3;
}


.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #b0b0b0;
}

input,
select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: #3c3c3c;
    color: #fff;
}

input::placeholder,
select::placeholder {
    color: #a0a0a0;
}


button[type="submit"] {
    background-color: #21a9ac;
    color: #fff;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

button[type="submit"]:hover {
    background-color: #189e96;
    transform: scale(1.05);
}


.success-message {
    color: #4caf50;
    margin-bottom: 20px;
    font-weight: bold;
}

.error-message {
    color: #f44336;
    margin-bottom: 20px;
    font-weight: bold;
}


.loader {
    margin: 20px 0;
    font-size: 1.2rem;
    color: #21a9ac;
}
</style>