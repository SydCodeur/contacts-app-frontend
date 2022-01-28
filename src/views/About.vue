<template>
    <NavBar />
    <div class="about-container">
        <div>
            <div class="avatar-image">
                <img width="150" height="150" src="@/assets/logo.png" alt="logo" />
            </div>
            <br />
            <h3 class="text-center">MyContacts</h3>
            <div class="text-center version">Version 0.0.1</div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
export default {
    name: 'About',
    components: {
        NavBar
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        }
    }
}
</script>

<style>
.avatar-image {
    display: flex;
    justify-content: center;
}
.about-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
.version {
    color: #4fc08d;
    font-weight: bold;
}
</style>