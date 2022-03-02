<template>
  <v-app>
    <div id="mainDiv">
      <Toolbar />
      <v-main>
        <v-container justify-center id="mainContainer" fluid class="pa-10"
          ><v-col align="center"
            ><p id="timeNow">
              {{ timeNow }}
            </p>
            <p id="timeLeft">
              {{ timeLeft }}
            </p>
          </v-col></v-container
        >
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Toolbar from "../../components/Toolbar.vue";

export default {
  name: "TimeView",
  components: {
    Toolbar,
  },
  data() {
    return {
      timeLeft: "00:00:00",
      timeNow: "00:00:00",
    };
  },
  methods: {
    exitAction() {
      localStorage.isLogedIn = false;
      this.$router.push("/login");
    },
    checkTime() {
      setTimeout(() => {
        let now = new Date();
        this.timeNow =
          (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
          ":" +
          (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
          ":" +
          (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
        let hours =
          16 - now.getHours() < 0
            ? 16 - now.getHours() + 24
            : 16 - now.getHours();
        let minutes = 59 - now.getMinutes();
        let seconds = 59 - now.getSeconds();
        this.timeLeft =
          (hours < 10 ? "0" + hours : hours) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ":" +
          (seconds < 10 ? "0" + seconds : seconds);

        this.checkTime();
      }, 1000);
    },
  },
  created() {},
  mounted() {
    if (localStorage.isLogedIn == "false") {
      this.$router.push("/login");
    }

    this.checkTime();
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

#mainContainer {
  display: flex;
  align-items: center;
  height: 85vh;
}

#timeLeft {
  color: white;
  font-weight: bold;
  font-size: 120px;
}

#timeNow {
  color: white;
  font-weight: bold;
  font-size: 220px;
}

@media (max-width: 600px) {
  #timeLeft {
    font-size: 30px;
  }

  #timeNow {
    font-size: 60px;
  }
}
</style>