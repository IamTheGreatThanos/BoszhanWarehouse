<template>
  <v-app>
    <div id="mainDiv">
      <Toolbar />
      <v-main>
        <v-container fluid class="pa-10">
          <v-data-table
            :headers="headers"
            :items="orders"
            sort-by="count_order"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Выдача на завтра</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="blue-grey darken-1"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Добавить
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Наименование"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.count_order"
                              label="Количество по заказу"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.count_oop"
                              label="Количество на складе (ООП)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.count_night"
                              label="Количество на складе (Ночники)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.count_uc"
                              label="Количество (УЦ)"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Toolbar from "../../components/Toolbar.vue";

export default {
  name: "TomorrowOrdersNight",
  components: {
    Toolbar,
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Наименование",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Количество по заказу", value: "count_order" },
        { text: "Количество на складе (ООП)", value: "count_oop" },
        { text: "Количество на складе (Ночники)", value: "count_night" },
        { text: "Количество (УЦ)", value: "count_uc" },
        { text: "Действие", value: "actions", sortable: false },
      ],
      orders: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        count_order: 0,
        count_oop: 0,
        count_night: 0,
        count_uc: 0,
      },
      defaultItem: {
        name: "",
        count_order: 0,
        count_oop: 0,
        count_night: 0,
        count_uc: 0,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Новый заказ" : "Редактирование";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    exitAction() {
      localStorage.isLogedIn = false;
      this.$router.push("/login");
    },
    initialize() {
      this.orders = [
        {
          name: "Frozen Yogurt",
          count_order: 159,
          count_oop: 6.0,
          count_night: 24,
          count_uc: 4.0,
        },
        {
          name: "Ice cream sandwich",
          count_order: 237,
          count_oop: 9.0,
          count_night: 37,
          count_uc: 4.3,
        },
        {
          name: "Eclair",
          count_order: 262,
          count_oop: 16.0,
          count_night: 23,
          count_uc: 6.0,
        },
        {
          name: "Cupcake",
          count_order: 305,
          count_oop: 3.7,
          count_night: 67,
          count_uc: 4.3,
        },
        {
          name: "Gingerbread",
          count_order: 356,
          count_oop: 16.0,
          count_night: 49,
          count_uc: 3.9,
        },
        {
          name: "Jelly bean",
          count_order: 375,
          count_oop: 0.0,
          count_night: 94,
          count_uc: 0.0,
        },
        {
          name: "Lollipop",
          count_order: 392,
          count_oop: 0.2,
          count_night: 98,
          count_uc: 0,
        },
        {
          name: "Honeycomb",
          count_order: 408,
          count_oop: 3.2,
          count_night: 87,
          count_uc: 6.5,
        },
        {
          name: "Donut",
          count_order: 452,
          count_oop: 25.0,
          count_night: 51,
          count_uc: 4.9,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
        {
          name: "KitKat",
          count_order: 518,
          count_oop: 26.0,
          count_night: 65,
          count_uc: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.orders.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.orders[this.editedIndex], this.editedItem);
      } else {
        this.orders.push(this.editedItem);
      }
      this.close();
    },
  },
  created() {
    this.initialize();
  },
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/login");
    }
  },
};
</script>


<style scoped>
#mainDiv {
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  background-image: url("https://boszhan.com/wp-content/uploads/2020/12/HEADER-AMG-COLD-STORES-MALTA-1920x800-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
}
</style>