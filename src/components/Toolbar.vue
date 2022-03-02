<template>
  <v-toolbar
    dark
    prominent
    src="https://instapik.ru/wp-content/uploads/2021/03/temno-krasnyy-fon-dlya-fotoshopa-abstraktnye-polosy.jpg"
  >
    <v-toolbar-title style="padding: 20px">
      <v-btn color="red darken-4" elevation="4" fab large @click="showHomeView"
        ><v-icon dark> mdi-home </v-icon></v-btn
      >
      Первомайские деликатесы</v-toolbar-title
    >

    <v-spacer></v-spacer>
    <v-avatar color="orange lighten-5" id="avatar" size="90"
      ><span>KA</span></v-avatar
    >
    <div class="column mb-6">
      <p id="nameLabel">Kenjebek Alibek</p>
      <p id="positionLabel">Nochnik</p>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {};
  },
  methods: {
    showHomeView() {
      this.$router.push("/night");
    },
  },
};
</script>

<style scoped>
#avatar {
  margin: 10px;
  color: red;
  font-weight: bold;
  font-size: 24px;
}

#nameLabel {
  font-weight: bold;
  font-size: 18px;
  padding: 30px 40px 0px 10px;
}

#positionLabel {
  font-weight: bold;
  font-size: 16px;
  padding: 0px 40px 10px 10px;
}
</style>