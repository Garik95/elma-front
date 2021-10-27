import Vue from "vue";
import VueRouter from "vue-router";
import mainView from "../views/main.vue";
import BaseLayout from "../components/layout/BaseLayout.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: BaseLayout,
		children: [
			{
				path: "/main",
				component: mainView,
			},
		],
	},
	{
		path: "/login",
		component: null,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
