<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      isAuth: '',
    }
  },
  mounted() {
    // let user = localStorage.getItem("user");
    // this.isAuth = !user ? false : true;
    // console.log('this.auth', this.isAuth);
  },
  methods: {
    logout() {
      console.log('Déconnexion');
    }
  }
}
</script>

<style>
#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  color: #4fc08d;
}

.logout-btn {
  background: #fff;
}
</style>




