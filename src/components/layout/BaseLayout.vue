<template>
	<div>
		<top-bar></top-bar>
		<v-row>
			<v-col cols="2">
				<tree />
			</v-col>
			<v-col>
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
