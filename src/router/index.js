import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), //Hasmode to properly handle web directing without any server config for deploying in vercel
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/AuthView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    {
      path: "/mood-tracker",
      name: "mood-tracker",
      component: () => import("../views/MoodTrackerView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/resources",
      name: "resources",
      component: () => import("../views/ResourcesView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/mood-history",
      name: "mood-history",
      component: () => import("../views/MoodHistoryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

// Navigation guard for protected routes
// I had to come up with this solution to prevent loggedout users from logging in and preventing loggedin 
// useres from going to loggedout pages when directing to the loggedin home instead of loggedout home.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    alert("Please log in to access this page.");
    next("/auth"); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;
