// moodStore.js
import { defineStore } from "pinia";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/init";

export const useMoodStore = defineStore("moodStore", {
  state: () => ({
    moods: [],
    loading: false,
    suggestions: [],
  }),

  actions: {
    async logMood(userId, mood, note) {
      try {
        this.loading = true;
        const userMoodCollectionRef = collection(db, "users", userId, "moods");

        await addDoc(userMoodCollectionRef, {
          mood: mood,
          note: note || "",
          timestamp: new Date(),
        });
      } catch (error) {
        console.error("Error logging mood:", error.message);
        throw new Error("Failed to log mood. Please try again.");
      } finally {
        this.loading = false;
      }
    },

    async fetchMoodHistory(userId) {
      try {
        this.loading = true;
        const moodsRef = collection(db, "users", userId, "moods");
        const q = query(moodsRef);
        const querySnapshot = await getDocs(q);

        this.moods = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching mood history:", error.message);
        throw new Error("Failed to fetch mood history.");
      } finally {
        this.loading = false;
      }
    },

    async fetchSuggestions(mood) {
      try {
        this.loading = true;
        console.log(`Fetching suggestions for mood: ${mood}`);

        const normalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();  
        console.log(`Normalized Mood: ${normalizedMood}`);

        
        const suggestionDocRef = doc(db, "moodSuggestions", normalizedMood);
        console.log("Fetching document:", suggestionDocRef.path);

        const suggestionDocSnap = await getDoc(suggestionDocRef);

        if (suggestionDocSnap.exists()) {
          console.log("Fetched Document Data:", suggestionDocSnap.data());
          this.suggestions = suggestionDocSnap.data().suggestions || [];
        } else {
          console.warn(`No suggestions found for mood: ${normalizedMood}`);
          this.suggestions = ["No suggestions found for this mood."];
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
        this.suggestions = ["An error occurred while fetching suggestions."];
      } finally {
        this.loading = false;
      }
    },

    async ensureMoodCollectionExists(userId) {
      try {
        const moodsCollection = collection(db, "users", userId, "moods");
        const querySnapshot = await getDocs(moodsCollection);
        if (querySnapshot.empty) {
          console.log("Creating placeholder mood entry...");
          await addDoc(moodsCollection, {
            mood: "Placeholder",
            note: "",
            timestamp: new Date(),
          });
        }
      } catch (error) {
        console.error("Error ensuring mood collection exists:", error.message);
      }
    },
  },
});
