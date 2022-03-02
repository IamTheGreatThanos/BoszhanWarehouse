<template>
  <v-app>
    <div id="mainDiv">
      <div id="loginMain">
        <p id="authTitle">Авторизация</p>
        <div id="column">
          <p id="inputTitle">Логин</p>
          <input id="loginInput" v-model="login" />
          <p id="inputTitle">Пароль</p>
          <input id="passwordInput" v-model="password" type="password" />
          <button
            id="submitBtn"
            type="button"
            class="btn btn-success"
            v-on:click="loginAction"
          >
            ВОЙТИ
          </button>
        </div>
        <div id="alertLogin">
          <v-alert v-if="successfullLabel" dismissible type="success">
            Успешно! Вы зашли в свой аккаунт!
          </v-alert>

          <v-alert v-if="errorLabel" dismissible type="error">
            Неправильный логин или пароль!
          </v-alert>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      url: "http://localhost:8000",
      login: "",
      password: "",
      successfullLabel: false,
      errorLabel: false,
      countDown: 5,
    };
  },
  created() {},

  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.errorLabel = false;
        this.successfullLabel = false;
      }
    },

    loginAction() {
      let config = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      };
      const body = { username: this.login, password: this.password };
      this.axios
        .post(this.url + "/api/login", body, config)
        .then((response) => {
          localStorage.username = response.data["username"];
          localStorage.token = response.data["token"];
          localStorage.isLogedIn = true;
          this.successfullLabel = true;
          this.countDown = 5;
          this.countDownTimer();
          if (this.countDown == 5) {
            this.$router.push("/");
          } else {
            this.$router.push("/night");
          }
        })
        .catch((error) => {
          console.log(error.response.request.response);
          this.errorLabel = true;
          this.countDown = 5;
          this.countDownTimer();
        });
    },
  },
};
</script>


<style scoped>
#mainDiv {
  background-image: url("https://boszhan.com/wp-content/uploads/2020/12/slide-food-2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
#loginMain {
  color: rgb(255, 255, 255);
  width: 400px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  font-family: "Trebuchet MS", Helvetica, Arial, sans-serif;
  box-shadow: 0px 0px 20px rgba(124, 124, 124, 0.7);
}

#authTitle {
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
}

#submitBtn {
  display: block;
  background-color: #546e7a;
  height: 50px;
  margin: 30px auto 10px auto;
  width: 80%;
  font-weight: bold;
  box-shadow: 0px 0px 20px #546e7ab0;
  text-transform: uppercase;
  border-radius: 15px;
}

#inputTitle {
  width: 75%;
  text-align: left;
  margin: 10px auto 0px auto;
  font-size: 18px;
}

#loginInput {
  padding: 0 0 0 10px;
  display: block;
  width: 80%;
  height: 40px;
  margin: 10px auto 10px auto;
  background-color: white;
  border-radius: 15px;
  font-weight: bold;

  border: 0;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.7);
}

#passwordInput {
  padding: 0 0 0 10px;
  display: block;
  width: 80%;
  height: 40px;
  margin: 10px auto 10px auto;
  background-color: white;
  border-radius: 15px;

  border: 0 none;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.7);
}

input:focus {
  outline: 3px solid #546e7a;
}

#alertLogin {
  padding-top: 50px;
}
</style>