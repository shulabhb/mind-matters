import { defineStore } from "pinia";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase/init";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => state.user,
  },

  actions: {
    async fetchUser() {
        console.log("Starting to fetch user...");
        this.loading = true;
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
    
            console.log("Firebase Auth currentUser:", currentUser);
    
            if (currentUser) {
                const userId = currentUser.uid;
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    this.user = { id: userId, ...userSnap.data() };
                    console.log("User successfully fetched:", this.user);
                } else {
                    console.warn("User document not found in Firestore.");
                    this.user = null;
                }
            } else {
                console.warn("No authenticated user in Firebase Auth.");
                this.user = null;
            }
        } catch (error) {
            console.error("Error fetching user:", error.message);
            this.user = null;
        } finally {
            this.loading = false;
        }
    },

    async logout() {
      try {
        const auth = getAuth();
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    },
  },
});
