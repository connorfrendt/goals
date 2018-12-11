<template>
  <div id="app">
    <header>
      <span v-if="user">
        Welcome {{user.username}}
      </span>
      <nav id="navbar" v-if="user">
        <RouterLink class="nav" to="/">Home</RouterLink>
        <RouterLink class="nav" to="/goals">Goals</RouterLink>
        <a href="#" class="nav" @click="handleLogout">Logout</a>
      </nav>
    </header>

    <main>
      <RouterView v-if="user" :user="user" />
      <Auth v-else
        :onSignUp="handleSignUp"
        :onSignIn="handleSignIn" />
    </main>
  </div>
</template>

<script>
import api from '../services/api';
import Auth from './auth/Auth';

export default {
  data() {
    return {
      user: null
    };
  },
  components: {
    Auth
  },
  created() {
    const json = window.localStorage.getItem('profile');
    if(json) {
      this.setUser(JSON.parse(json));
    }
  },
  methods:{
    handleSignUp(profile) {
      return api.signUp(profile)
        .then(user => {
          this.setUser(user);
        });
    },
    handleSignIn(credentials) {
      return api.signIn(credentials)
        .then(user => {
          this.setUser(user);
        });
    },
    setUser(user) {
      this.user = user;
      if(user) {
        api.setToken(user.id);
        window.localStorage.settem('profile', JSON.stringify(user));
      }
      else {
        api.setToken();
        window.localStorage.removeItem('profile');
      }
    },
    handleLogout() {
      this.setUser(null);
      this.$router.push('/');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#navbar {
  display: flex;
  justify-content: flex-end;
}

.nav {
  padding: 5px;
  margin: 0 5px;
  border: 1px solid black;

}
</style>
