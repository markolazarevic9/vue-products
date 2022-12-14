import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
const routes = [{ path: "/", component: Home, name: "Home" }];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
