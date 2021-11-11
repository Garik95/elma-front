<template>
	<div>
		<top-bar></top-bar>
		<v-row no-gutters>
			<v-col cols="3">
				<tree />
			</v-col>
			<v-col cols="9">
				<router-view></router-view>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import TopBar from "../includes/TopBar.vue";
	import Tree from "../includes/TreeView.vue";
	export default {
		components: {
			TopBar,
			Tree,
		},
	};
</script>
