import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";

import NotFound from "@/views/NotFound.vue";

//
import AddContact from "@/views/AddContact.vue";

const routes = [
  {
    name: "Home",
    path: "/contacts",
    component: Home,
    meta: {
      title: "Accueil",
    },
  },
  {
    name: "Profile",
    path: "/profile",
    component: Profile,
    meta: {
      title: "Mon profil",
    },
  },
  {
    name: "Login",
    path: "/",
    component: Login,
    meta: {
      title: "Authentification",
    },
  },
  {
    name: "AddContact",
    path: "/add-contact",
    component: AddContact,
    meta: {
      title: "Ajouter un contact",
    },
  },
  {
    name: "About",
    path: "/about",
    component: About,
    meta: {
      title: "A propos",
    },
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)",
    component: NotFound,
    meta: {
      title: "Page introuvable",
    },
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.afterEach((to) => {
  // console.log(from);
  document.title = to.meta.title;
});

export default router;
