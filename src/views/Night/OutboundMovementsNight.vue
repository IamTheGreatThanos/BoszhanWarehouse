<template>
  <v-app>
    <div id="mainDiv">
      <Toolbar />
      <v-main>
        <v-container fluid class="pa-10">
          <v-data-table
            :headers="headersMovements"
            :items="movements"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Исходящие перемещения</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5"
                        >Перемещение №{{ editedItem.id }}</span
                      >
                    </v-card-title>

                    <v-card-text>
                      <v-data-table
                        :headers="headersOrders"
                        :items="orders"
                        class="elevation-1"
                      >
                        <template v-slot:top>
                          <v-toolbar flat>
                            <v-toolbar-title>Товары</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                          </v-toolbar>
                        </template>
                      </v-data-table>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Закрыть
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogConfirmation" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Вы подтверждаете?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="itemConfirm"
                        >Да</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="closeConfirm"
                        >Отмена</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click="openMovement(item)">
                mdi-open-in-app
              </v-icon>
              <v-icon class="mr-2" @click="confirmMovement(item)">
                mdi-check
              </v-icon>
              <v-icon @click="returnMovement(item)"> mdi-restore </v-icon>
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
  name: "OutboundMovementsNight",
  components: {
    Toolbar,
  },
  data() {
    return {
      dialog: false,
      dialogConfirmation: false,
      headersMovements: [
        {
          text: "Номер",
          value: "id",
          align: "start",
          sortable: false,
        },
        { text: "Дата", value: "date" },
        { text: "Склад источник", value: "sourceStorage", sortable: false },
        { text: "Количество", value: "count" },
        { text: "Склад приемник", value: "receiverStorage", sortable: false },
        { text: "МОП приемник", value: "mopStorage", sortable: false },
        { text: "Примечание", value: "comment", sortable: false },
        { text: "Автор", value: "author", sortable: false },
        { text: "Действие", value: "actions", sortable: false },
      ],
      headersOrders: [
        {
          text: "№",
          align: "start",
          sortable: false,
          value: "numberOrder",
        },
        {
          text: "Код",
          align: "start",
          sortable: false,
          value: "idOrder",
        },
        {
          text: "Наименование",
          align: "start",
          sortable: false,
          value: "nameOrder",
        },
        {
          text: "Ед. Изм.",
          align: "start",
          sortable: false,
          value: "unitOrder",
        },
        {
          text: "Кол-во",
          align: "start",
          sortable: false,
          value: "countOrder",
        },
        { text: "Тех. ост.", value: "remainderOrder" },
        { text: "Цена", value: "priceOrder" },
        { text: "Сумма", value: "sumOrder" },
      ],
      movements: [],
      orders: [],
      editedIndex: -1,
      editedItem: {
        id: "1111 - 2222",
        date: Date().toString(),
        sourceStorage: "sourceStorage",
        count: 0,
        receiverStorage: "receiverStorage",
        mopStorage: "mopStorage",
        comment: "comment",
        author: "author",
      },
      defaultItem: {
        id: "1111 - 2222",
        date: Date().toString(),
        sourceStorage: "sourceStorage",
        count: 0,
        receiverStorage: "receiverStorage",
        mopStorage: "mopStorage",
        comment: "comment",
        author: "author",
      },
    };
  },
  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    exitAction() {
      localStorage.isLogedIn = false;
      this.$router.push("/login");
    },
    initialize() {
      this.movements = [
        {
          id: "1111 - 2222",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
        {
          id: "1111 - 22223",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
        {
          id: "1111 - 22224",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
        {
          id: "1111 - 22225",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
        {
          id: "1111 - 22262",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
        {
          id: "1111 - 22227",
          date: Date().toString(),
          sourceStorage: "sourceStorage",
          count: 0,
          receiverStorage: "receiverStorage",
          mopStorage: "mopStorage",
          comment: "comment",
          author: "author",
        },
      ];

      this.orders = [
        {
          numberOrder: 1,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
        {
          numberOrder: 2,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
        {
          numberOrder: 3,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
        {
          numberOrder: 4,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
        {
          numberOrder: 5,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
        {
          numberOrder: 6,
          idOrder: "159 - 077",
          nameOrder: "Frozen Yogurt",
          unitOrder: "кг",
          countOrder: 16.0,
          remainderOrder: 1344.0,
          priceOrder: 620.0,
          sumOrder: 184000.0,
        },
      ];
    },

    openMovement(item) {
      this.editedIndex = this.movements.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    confirmMovement(item) {
      this.editedIndex = this.movements.indexOf(item);
      this.dialogConfirmation = true;
    },

    returnMovement(item) {
      this.editedIndex = this.movements.indexOf(item);
      this.dialogConfirmation = true;
    },

    itemConfirm() {
      console.log(this.editedIndex);
      this.closeConfirm();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeConfirm() {
      this.dialogConfirmation = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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

