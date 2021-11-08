<template>
  <div class="sidebar">
    <v-overlay :absolute="true" :value="overlay">
      <v-progress-circular indeterminate size="32"></v-progress-circular>
    </v-overlay>
    <v-card-title class="black--text text-h6">
      Документы
      <v-spacer />
      <v-btn icon color="green" x-small @click="getTree()">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-card-title>
    <v-treeview
      class=""
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
        <v-icon color="orange" v-if="!item.file">
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <v-icon v-else>
          {{ files[item] }}
        </v-icon>
      </template>
      <template v-slot:append="{ item }">
        <v-icon @click="push(item._id)"> mdi-chevron-right </v-icon>
      </template>
      <template slot="label" slot-scope="{ item }">
        <!-- <a @click="push(item._id)">{{ item.name }}</a> -->
        {{ item.name }}
      </template>
    </v-treeview>
    <div class="text-center">
      <v-btn icon color="green" @click="dialogModal('open')">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Создать папку </v-card-title>

        <v-card-text>
          <v-text-field
            label="Название папки"
            v-model="newFolderName"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogModal('close')">
            Отмена
          </v-btn>

          <v-btn color="green darken-1" text @click="dialogModal('submit')">
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
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
    newFolderName: "",
    dialog: false,
    overlay: true,
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
  mounted: function () {
    this.getTree();
  },
  methods: {
    getTree() {
      this.overlay = true;
      axios
        .get("Folder")
        .then((response) => {
          this.items = this.nest(response.data);
          this.overlay = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    push(id) {
      this.$router.push({ name: "folder", params: { id } });
    },
    pushItem() {
      axios
        .post("Folder", { name: this.newFolderName })
        .then((response) => {
          this.items.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogModal(action) {
      switch (action) {
        case "open": {
          this.dialog = true;
          break;
        }
        case "close": {
          this.newFolderName = "";
          this.dialog = false;
          break;
        }
        case "submit": {
          this.pushItem();
          this.dialogModal("close");
          break;
        }
      }
    },
    nest(items, _id = null, link = "parent") {
      return items
        .filter((item) => item[link] === _id)
        .map((item) => ({
          ...item,
          children: this.nest(items, item._id),
        }));
    },
  },
};
</script>

<style scoped>
/* .treeview-item {
  max-height: 50px;
  border-style: dashed;
} */

.sidebar-container {
  position: relative;
}

.sidebar {
  background-color: #f8f8f8;
  height: calc(100vh - 50px);
}
</style>
