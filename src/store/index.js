import { createStore } from "vuex";
import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://my-contacts-api-v1.herokuapp.com/api/v1",
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (error) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// console.log("Window url in store", window.baseurl);

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      email: "",
      firstName: "",
      lastName: "",
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.token}`;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
    logout(state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/signup", userInfos)
          .then((response) => {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch((err) => {
            if (err.response.status == 422) {
              // console.log("Store create account validation : ", err.response.data.message);
              commit("setStatus", err.response.data.message);
            } else {
              // console.log("INTERNAL ERROR : ", err);
              commit("setStatus", "INTERNAL_ERROR");
            }

            reject(err);
          });
      });
    },
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login", userInfos)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch((err) => {
            commit("setStatus", "error_login");
            if (err.response.status == 401) {
              console.log(
                "Store login validation : ",
                err.response.data.message
              );
              commit("setStatus", err.response.data.message);
            } else {
              // console.log("INTERNAL ERROR : ", err);
              commit("setStatus", "INTERNAL_ERROR");
            }
            reject(err);
          });
      });
    },
    getUserInfos: ({ commit }) => {
      instance
        .get("/auth/profile")
        .then((response) => {
          console.log("profile response", response.data.user);
          commit("userInfos", response.data.user);
        })
        .catch((error) => {
          console.log("ERROR LOGIN", error);
        });
    },
  },
});

export default store;
