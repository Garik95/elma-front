<template>
  <header>
    <nav class="navigation">
      <router-link to="/">
        <img class="logo" :src="require('../../assets/logo_ru.png')">
      </router-link>
      <v-spacer></v-spacer>

      <div class="search">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              hide-details
              dense
              flat
              label="Поиск"
              append-icon="mdi-magnify"
              class="search"
              @keypress="getResults"
              v-model="search"
              v-bind="attrs"
              v-on="on"
              clearable
            >
              Search document
            </v-text-field>
          </template>
          <div class="search_list">
            <v-list>
              <div v-if="!items.length">
                <v-list-item>
                  <span v-if="search.length > 3">
                    Ничего не найдено
                  </span>
                  <span v-else>
                    Введите название документа (мин 3 символа)
                  </span>
                </v-list-item>
              </div>
              <v-subheader v-else>Найдено: {{ items.length }}</v-subheader>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="{
                  name: 'folder',
                  params: { id: item.folder },
                }"
              >
                <v-icon
                  class="mr-5"
                  v-if="path.extname(item.originalName) == '.pdf'"
                  color="red"
                >
                  mdi-file-pdf-box
                </v-icon>
                <v-icon
                  class="mr-5"
                  color="primary"
                  v-else-if="
                    path.extname(item.originalName) == '.doc' ||
                    path.extname(item.originalName) == '.docx'
                  "
                >
                  mdi-microsoft-word
                </v-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.originalName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-menu>
      </div>
      <!-- <ul>
        <li>
          <router-link to="/main">Admin</router-link>
        </li>
        <li><router-link to="/">Exit</router-link></li>
      </ul> -->
    </nav>
  </header>
</template>
<script>
import axios from "axios";
import path from "path";

export default {
  data: () => ({
    search: "",
    items: [],
    path: path,
  }),
  methods: {
    getResults() {
      if (this.search.length >= 3) {
        // alert(this.search);
        axios
          .get("File/", {
            params: {
              searchTerm: this.search,
            },
          })
          .then((response) => {
            console.log(response.data);
            this.items = response.data;
          });
      }
    },
  },
};
</script>

<style>
#app {
  /* background-image: url('../../assets/double-bubble-outline.png'); */
}
.navigation {
  display: flex;
  height: 65px;
  align-items: center;
  padding: 24px;
  background-color: #fff;
  border-bottom: 2px solid #eee;
}

.search {
  width: 400px;
}

.logo {
  width: 250px;
}
</style>
