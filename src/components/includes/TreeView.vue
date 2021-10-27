<template>
	<v-treeview
		v-model="tree"
		:open="initiallyOpen"
		:items="items"
		activatable
		item-key="name"
		open-on-click
		expan-on-hover
		loading-icon
	>
		<template v-slot:prepend="{ item, open }">
			<v-icon v-if="!item.file">
				{{ open ? "mdi-folder-open" : "mdi-folder" }}
			</v-icon>
			<v-icon v-else>
				{{ files[item.file] }}
			</v-icon>
		</template>
	</v-treeview>
</template>

<script>
	export default {
		props: ["navbar"],
		methods: {
			adder() {},
		},
		data: () => ({
			initiallyOpen: ["public"],
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
			items: [
				{
					name: "Firstone",
				},
				{
					name: "Secondone",
				},
				{
					name: "Thirdone",
					children: [
						{
							name: "static",
							children: [
								{
									name: "logo.png",
									file: "png",
								},
							],
						},
						{
							name: "favicon.ico",
							file: "png",
						},
						{
							name: "index.html",
							file: "html",
						},
					],
				},
			],
		}),
	};
</script>
