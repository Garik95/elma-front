import Vue from "vue";
import VueRouter from "vue-router";
import FolderActionPage from "../views/FolderActionPage.vue";
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
				path: "/folder/:id",
				name: "folder",
				component: FolderActionPage,
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
