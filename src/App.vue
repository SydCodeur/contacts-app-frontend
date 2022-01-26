<template>
  <!-- <div class="container">
    <div class="row">
      <div class="col-lg-6"></div>
      <div class="col-lg-6">
        <router-link class="routerLink" to="/">Mes contacts</router-link>&nbsp;&nbsp;&nbsp;
        <router-link class="routerLink" to="/add-contact">Ajouter un contact</router-link>&nbsp;&nbsp;&nbsp;
        <router-link class="routerLink" to="/about">A propos</router-link>
      </div>
    </div>
  </div>-->
  <!-- <router-link :to="{ name: 'Contact', params: { phone: '22899728988' } }">Contact</router-link>
  <button class="btn btn-info" @click="showContact('22890148968')">Contact suivant</button>-->

  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">
        <span style="font-weight: bold;">MyContacts</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav ml-auto">
          <router-link to="/" class="nav-item nav-link">Mes contacts</router-link>
          <router-link to="/add-contact" class="nav-item nav-link">Ajouter un contact</router-link>
          <router-link to="/about" class="nav-item nav-link">À propos</router-link>
        </div>
      </div>
    </nav>
  </div>

  <router-view />
</template>

<style>
#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /* color: #42b983; */
  color: #4fc08d;
}
</style>




