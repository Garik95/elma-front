<template>
	<v-container class="height: 30px, pa-0">
		<v-card flat class="height: 100% width: 100%">
			<v-card-title class="black--text text-h6, clr"> Documents</v-card-title>
			<v-treeview
				class="treeview-item, clr"
				v-model="tree"
				:items="items"
				activatable
				item-key="name"
				open-on-click
				expan-on-hover
				color="primary"
				transition
				dense
				fluid
			>
				<v-divider vertical></v-divider>

				<template v-slot:prepend="{ item, open }">
					<v-icon v-if="!item.file">
						{{ open ? "mdi-folder-open" : "mdi-folder" }}
					</v-icon>
					<v-icon v-else>
						{{ files[item] }}
					</v-icon>
				</template>
				<template v-slot:append="{ item }">
					<v-icon @click="push(item.id)"> mdi-chevron-right </v-icon>
				</template>
				<template slot="label" slot-scope="{ item }">
					<a @click="push(item.id)">{{ item.name }}</a>
				</template>
			</v-treeview>
			<div class="text-center">
				<v-btn icon color="green" @click="pushItem">
					<v-icon>mdi-plus</v-icon>
				</v-btn>
			</div>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
			count: 1,
			files: {
				html: "mdi-language-html5",
				js: "mdi-nodejs",
				json: "mdi-code-json",
				md: "mdi-language-markdown",
				pdf: "mdi-file-pdf",
				png: "mdi-file-image",
				txt: "mdi-file-document-outline",
				xls: "mdi-file-excel",
			},
			tree: [],
			active: [],
			items: [
				// {
				// 	id: 1,
				// 	name: "IPK Folder",
				// 	children: [
				// 		{
				// 			id: 2,
				// 			name: "0199",
				// 			//file: "png",
				// 			children: [{ id: 123, name: "dep1" }],
				// 		},
				// 		{
				// 			id: 3,
				// 			name: "0283",
				// 			// file: "png",
				// 		},
				// 		{
				// 			id: 4,
				// 			name: "index.html",
				// 			// file: "html",
				// 		},
				// 	],
				// },
				// {
				// 	id: 3,
				// 	name: 222,
				// 	children: [
				// 		{
				// 			id: 5,
				// 			name: "exe",
				// 			file: "pdf",
				// 		},
				// 	],
				// },
			],
		}),

		methods: {
			push(id) {
				this.$router.push({ name: "main", params: { id } });
			},
			pushItem() {
				this.items.push({ id: this.count, name: "Folder #" + this.count });
				this.count++;
			},
		},
	};
</script>

<style scoped>
	.treeview-item {
		max-height: 50px;
		border-style: dashed;
	}
	.clr {
		background-color: #e1f5fe;
	}
</style>
