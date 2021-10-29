<template>
	<v-card flat class="pa-1">
		<v-card-title class="black--text text-h6" pa-3> Selelct</v-card-title>
		<v-treeview
			v-model="tree"
			:items="items"
			activatable
			item-key="name"
			open-on-click
			expan-on-hover
			color="primary"
			transition
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
				<a @click="push(item.id)">{{ item.name + item.id }}</a>
			</template>
		</v-treeview>
	</v-card>
</template>

<script>
	export default {
		name: "TreeView",
		data: () => ({
			files: {
				//icons
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
				{
					id: 1,
					name: "Folder name",
					children: [
						{
							id: 2,
							name: "0199",
							//file: "png",
							children: [{ id: 123, name: "dep1" }],
						},

						{
							id: 3,
							name: "0283",
							// file: "png",
						},
						{
							id: 4,
							name: "index.html",
							// file: "html",
						},
					],
				},
			],
		}),
		methods: {
			push(id) {
				this.$router.push({ name: "main", params: { id } });
			},
		},
	};
</script>
