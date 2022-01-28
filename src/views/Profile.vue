<template>
    <NavBar />
    <div class="container profile-container">
        <div>
            <div class="avatar-image">
                <img width="150" height="150" src="@/assets/avatar.png" alt="logo" />
            </div>
            <br />
            <h3 class="text-center">{{ user.firstName }} {{ user.lastName }}</h3>
            <div class="text-center email-text">{{ user.email }}</div>
            <br />

            <div class="col text-center">
                <button class="btn btn-info text-center rounded-pill" @click="logout">Se déconnecter</button>
            </div>
        </div>
    </div>
</template>


<script>

import { mapState } from 'vuex';
import NavBar from '../components/NavBar.vue';

export default {
    name: 'Profile',
    components: { NavBar },
    mounted() {
        // console.log(this.$store.state.user);
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos'
        })
    },
    methods: {
        logout() {
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }

}
</script>

<style>
.avatar-image {
    display: flex;
    justify-content: center;
}
.profile-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
.email-text {
    color: #4fc08d;
    font-weight: bold;
}
</style>