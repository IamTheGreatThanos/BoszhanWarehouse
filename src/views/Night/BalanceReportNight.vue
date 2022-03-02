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
                <v-toolbar-title>Отчет по остаткам</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <div class="subtitle-1">18.01.2022-22.01.2022</div>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
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
  name: "BalanceReportNight",
  components: {
    Toolbar,
  },
  data() {
    return {
      headers: [
        {
          text: "Наименование",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Остаток на начало", value: "count_order" },
        { text: "Пришло", value: "count_oop" },
        { text: "Ушло", value: "count_night" },
        { text: "Остаток на конец", value: "count_uc" },
      ],
      orders: [],
    };
  },
  computed: {},

  watch: {},
  methods: {
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