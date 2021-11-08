<template>
  <v-responsive>
    <v-breadcrumbs :items="bItems" divider="-"></v-breadcrumbs>
    <v-container>
      <v-overlay :absolute="true" :value="overlay">
        <v-progress-circular indeterminate size="32"></v-progress-circular>
      </v-overlay>
      <v-card-title class="blue lighten-5">
        Папка: {{ folder.name }}
        <v-spacer />
        <v-btn icon color="purple" v-if="info == true" @click="info = !info">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-btn icon color="grey" v-if="info == false" @click="info = !info">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-btn icon color="orange" @click="fileDialog = true">
          <v-icon>mdi-file-plus</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="dialogModal('open')">
          <v-icon>mdi-folder-plus</v-icon>
        </v-btn>
        <v-btn icon color="blue" @click="dialogModal('rename')">
          <v-icon>mdi-form-textbox</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="removeDialog('open')">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle v-show="info" class="pa-5">
        <v-row>
          <v-col>
            Создан: {{ new Date(folder.createdAt).toLocaleDateString("ru-RU") }}
          </v-col>
          <v-divider vertical inset></v-divider>
          <v-col> Создан(Кем): {{ folder.createdBy }} </v-col>
          <v-divider vertical inset></v-divider>
          <v-col>
            Изменен:
            {{ new Date(folder.updatedAt).toLocaleDateString("ru-RU") }}
          </v-col>
          <v-divider vertical inset></v-divider>
          <v-col> Изменен(Кем): {{ folder.updatedBy }} </v-col>
        </v-row>
      </v-card-subtitle>
      <v-row>
        <v-col cols="6">
          Папки
          <div v-for="child in childs" :key="child._id">
            <v-list-item>
              <v-list-item-icon
                ><v-btn icon color="orange"
                  ><v-icon>mdi-folder</v-icon></v-btn
                ></v-list-item-icon
              >
              <v-list-item-content>
                <v-list-item-title>{{ child.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-col>
        <v-col cols="6"
          >Файлы
          <div v-for="f in files" :key="f._id">
            <v-list-item>
              <v-list-item-icon>
                <v-btn icon color="red" v-if="f.ext == '.pdf'">
                  <v-icon>mdi-file-pdf-box</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="info"
                  v-if="f.ext == '.doc' || f.ext == '.docx'"
                >
                  <v-icon>mdi-microsoft-word</v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ f.originalName }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="primary" dark v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link>
                      <v-list-item-title
                        ><a v-bind:href="menuClick(f, 1)"
                          >Скачать</a
                        ></v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item link @click="menuClick(f, 2)">
                      <v-list-item-title>Заменить</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="menuClick(f, 3)">
                      <v-list-item-title>Удалить</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500">
        <v-card v-if="onEdit == false">
          <v-card-title class="text-h5"> Создать вложенную папку </v-card-title>

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
        <v-card v-if="onEdit == true">
          <v-card-title class="text-h5"> Переименовать папку </v-card-title>

          <v-card-text>
            <v-text-field
              label="Название новой папки"
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
      <v-dialog v-model="fileDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5"> Загрузить файл </v-card-title>

          <v-card-text>
            <v-file-input
              accept=".doc,.docx,.pdf"
              label="Файл"
              v-model="file"
              show-size
            ></v-file-input>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="fileInputDialog('close')"
            >
              Отмена
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="fileInputDialog('submit')"
            >
              Создать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-dialog v-model="confirmDialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Удалить папку ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="removeDialog('close')">
            Отмена
          </v-btn>

          <v-btn color="red darken-1" text @click="removeDialog('submit')">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<script>
import axios from "axios";
import path from "path";
import conf from "../../conf.json";
export default {
  data: () => ({
    folder: null,
    childs: [],
    onEdit: false,
    info: false,
    file: null,
    files: [],
    fileDialog: false,
    overlay: true,
    dialog: false,
    confirmDialog: false,
    newFolderName: "",
    parent: "",
    init: { text: "Home", href: "/" },
    bItems: [],
  }),
  created: function () {
    this.getFolder();
    this.getBread();
  },
  mounted: function () {
    this.bItems = [this.init];
    // this.items = [this.init];
  },
  watch: {
    $route() {
      this.getFolder();
      this.getBread();
    },
  },
  methods: {
    menuClick(file, action) {
      switch (action) {
        case 1: {
          return conf.content_server_url + file.name;
        }
      }
    },
    getBread() {
      this.bItems = [this.init];
      axios
        .get("/Folder/" + this.$route.params.id + "/parent")
        .then((response) => {
          response.data.forEach((item) => {
            item.href = "/folder/" + item.href;
          });
          this.bItems = this.bItems.concat(response.data);
          this.overlay = false;
        });
    },
    getFolder() {
      this.overlay = true;
      axios
        .get("Folder/" + this.$route.params.id)
        .then((response) => {
          this.folder = response.data;
          this.parent = this.$route.params.id;
          axios
            .get("Folder/" + this.$route.params.id + "/child")
            .then((response) => {
              this.childs = response.data;
              // this.overlay = false;
            })
            .catch((err) => {
              console.log(err);
            });
          axios.get("File/folder/" + this.$route.params.id).then((response) => {
            this.files = response.data;
            this.files.forEach((file) => {
              file.ext = path.extname(file.originalName);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeFolder() {
      this.overlay = true;
      axios
        .delete("Folder/" + this.$route.params.id)
        .then((response) => {
          if (response.data.deletedCount > 0) {
            this.$router.push({
              name: "folder",
              params: { id: this.folder.parent },
            });
          } else {
            alert("Cannot remove folder");
            this.overlay = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeDialog(action) {
      switch (action) {
        case "open": {
          this.confirmDialog = true;
          break;
        }
        case "close": {
          this.confirmDialog = false;
          break;
        }
        case "submit": {
          this.removeFolder();
          this.confirmDialog = false;
          break;
        }
      }
    },
    fileInputDialog(action) {
      switch (action) {
        case "submit": {
          var formData = new FormData();
          formData.append("folder", this.$route.params.id);
          formData.append("file", this.file);
          axios.post("File", formData).then((response) => {
            this.files.push(response.data);
            this.files.forEach((file) => {
              file.ext = path.extname(file.originalName);
            });
            this.$forceUpdate();
            this.file = null;
            this.fileDialog = false;
          });
          break;
        }
        case "close": {
          this.file = null;
          this.fileDialog = false;
          break;
        }
      }
    },
    pushItem() {
      axios
        .post("Folder", { name: this.newFolderName, parent: this.parent })
        .then((response) => {
          this.items.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    renameItem() {
      this.overlay = true;
      axios
        .put("Folder/" + this.$route.params.id, {
          name: this.newFolderName,
        })
        .then((response) => {
          if (response.data.modifiedCount > 0) {
            this.folder.name = this.newFolderName;
            this.$router.push({
              name: "folder",
              params: { id: this.$route.params.id },
            });
            this.overlay = false;
          } else {
            alert("Something gone wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialogModal(action) {
      switch (action) {
        case "rename": {
          this.onEdit = true;
          this.dialog = true;
          break;
        }
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
          if (this.onEdit) {
            this.renameItem();
          } else {
            this.pushItem();
          }
          this.dialogModal("close");
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.border {
  border-style: 2px dotted;
}
</style>
