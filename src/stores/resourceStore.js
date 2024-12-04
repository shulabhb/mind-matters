import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/init";

export const useResourceStore = defineStore("resourceStore", {
  state: () => ({
    resources: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchResources() {
      if (this.resources.length) return; // This avoids fetching again if data already exists
      this.loading = true;
      this.error = null;  
      try {
        const querySnapshot = await getDocs(collection(db, "resources"));
        this.resources = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching resources:", error.message);
        this.error = "Failed to load resources. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
  },
});
