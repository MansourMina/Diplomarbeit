<template>
  <v-container style="height: 100%">
    <!-- @submit.prevent="login" -->
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <div class=" text-center ">
          <img src="@/assets/Anmeldung_Logo.jpg" width="70%" />
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-row class="px-3">
          <label class="pl-0 mb-1">
            <h6 class="mb-0 text-sm">User-ID</h6>
          </label>
          <v-text-field
            flat
            outlined
            dense
            class="mt-2 mb-1 pb-0"
            hide-details
            type="text"
            solo
            color="red darken-4"
            @keyup.enter="login()"
            name="email"
            v-model="userId"
            placeholder="Enter a valid user-id"
          />
          <label class="pl-0 mb-1">
            <h6 class="  text-sm" style="color:red">
              {{ message }}
            </h6>
          </label>
        </v-row>
        <v-row class="px-3 ">
          <label class="pl-0 mb-1">
            <h6 class=" mb-0 text-sm">Password</h6>
          </label>
          <v-text-field
            flat
            outlined
            dense
            color="red darken-4"
            class="mt-2 mb-1 pb-0"
            hide-details
            :append-icon="see ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click:append="() => (see = !see)"
            solo
            :type="see ? 'text' : 'password'"
            name="password"
            @keyup.enter="login()"
            v-model="passwort"
            placeholder="Enter password"
          />

          <label class="pl-0 mb-1">
            <h6 class=" mb-0 text-sm" style="color:red">
              {{ message }}
            </h6>
          </label>
        </v-row>
        <!-- <v-checkbox
          v-model="angemeldetBleiben"
          label="Angemeldet bleiben"
          value="true"
        ></v-checkbox> -->
        <!-- <div class="row px-3 mb-4">
                <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
              </div> -->
        <v-btn
          @click="login()"
          class="white--text red darken-4 mt-5"
          style="border-radius: 0; width: 5vw"
        >
          Login
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog persistent v-model="showProgress" width="150">
      <v-progress-linear
        color="red darken-4"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios';
export default {
  name: 'app',
  data() {
    return {
      userId: '',
      passwort: '',
      user: {},
      see: false,
      message: '',
      angemeldetBleiben: false,
      loginData: {},
      showProgress: false,
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.user = user;
    }
  },
  methods: {
    async login() {
      this.showProgress = true;
      try {
        let { data } = await axios({
          url: '/login',
          method: 'POST',
          contentType: 'application/json',
          data: {
            userId: this.userId,
            passwort: this.passwort,
          },
        });
        if (data.user.firmen_id != undefined) {
          await this.pushHistory(data);
        }
        this.showProgress = false;

        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(data));
        this.loginData = data;
        await this.$router.push('/');
        this.$router.go();

        // Eingeloggt bleiben oder nicht

        // if (
        //   this.angemeldetBleiben == 'false' ||
        //   this.angemeldetBleiben == false
        // ) {
        //   localStorage.setItem(
        //     'loginBleiben',
        //     JSON.stringify({ login: false }),
        //   );
        // } else if (
        //   this.angemeldetBleiben == 'true' ||
        //   this.angemeldetBleiben == true
        // ) {
        //   localStorage.setItem('loginBleiben', JSON.stringify({ login: true }));
        // }
      } catch (err) {
        this.showProgress = false;
        this.message = 'Wrong User ID or password';
      }
    },
    async pushHistory(data) {
      if (
        data.user.logged_in_first_time == false ||
        data.user.logged_in_first_time == null
      ) {
        await axios({
          url: '/login/' + data.user.firmen_id,
          method: 'PATCH',
          contentType: 'application/json',
        });
        await axios({
          url: '/activities',
          method: 'POST',
          contentType: 'application/json',
          data: {
            type: 'Login',
            time: new Date(),
            firmen_id: data.user.firmen_id,
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.input-icons i {
  position: absolute;
}

.text-sm {
  font-size: 14px !important;
}

::placeholder {
  color: #bdbdbd;
  opacity: 1;
  font-weight: 300;
}

:-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

::-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

.logininput {
  padding: 10px 12px 10px 12px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 5px;
  margin-top: 2px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 14px;
  letter-spacing: 1px;
}

.logininput:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #304ffe;
  outline-width: 0;
}
</style>
