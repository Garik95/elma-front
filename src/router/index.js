import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../views/MainPage.vue";
import BaseLayout from "../components/layout/BaseLayout.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: BaseLayout,
		children: [
			{
				path: "/main/:id",
				name: "main",
				component: MainPage,
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
