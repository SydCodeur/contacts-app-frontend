<template>
    <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <form class="col-12">
                <div class="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example input"
                    />
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input
                        type="text"
                        class="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Another input"
                    />
                </div>
            </form>
        </div>
    </div>
    <!-- <div class="container">
        <br />
        <div class="row">
            <div class="col-lg-6 offset-3">
                <h1 class="text-center" v-if="mode == 'login'">Connexion</h1>
                <h1 class="text-center" v-else>Inscription</h1>
                <form>
                    <small
                        v-if="mode == 'login'"
                        id="emailHelp"
                        class="form-text text-muted text-center"
                    >
                        Vous n'avez pas de compte ?
                        <a class="btn" @click="switchToCreateAccount">
                            <span style="color : #4fc08d;">créer un compte</span>
                        </a>
                    </small>
                    <small v-else id="emailHelp" class="form-text text-muted text-center">
                        Vous avez déjà un compte ?
                        <a class="btn" @click="switchToLogin">
                            <span style="color : #4fc08d;">Connectez-vous</span>
                        </a>
                    </small>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                        />
                    </div>
                    <div v-if="mode == 'create'" class="form-group">
                        <label for="firstname">Prénoms</label>
                        <input
                            v-model="firstName"
                            type="text"
                            class="form-control"
                            id="firstname"
                            placeholder="Prénoms"
                        />
                    </div>
                    <div v-if="mode == 'create'" class="form-group">
                        <label for="lastName">Nom</label>
                        <input
                            v-model="lastName"
                            type="text"
                            class="form-control"
                            id="lastName"
                            placeholder="Nom"
                        />
                    </div>

                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Mot de passe"
                        />
                    </div>
                </form>
                <div v-if="mode == 'login' && status == 'error_login'">
                    <small class="form-text text-muted text-center">
                        <span style="color: red;">Paramètres de connexion invalides</span>
                    </small>
                    <br />
                </div>
                <div v-if="mode == 'create' && status == 'error_create'">
                    <small class="form-text text-muted text-center">
                        <span style="color: red;">La création de compte a échoué</span>
                    </small>
                    <br />
                </div>
                <span></span>
                <button
                    v-if="mode == 'login'"
                    @click="login"
                    type="submit"
                    class="btn btn-lg btn-block auth-btn"
                    :disabled="!validatedFields"
                >
                    <span v-if="status == 'loading'">Chargement...</span>
                    <span v-else>Se connecter</span>
                </button>

                <button
                    @click="createAccount"
                    v-else
                    type="submit"
                    class="btn btn-lg btn-block auth-btn"
                    :disabled="!validatedFields"
                >
                    <span v-if="status == 'loading'">Chargement...</span>
                    <span v-else>Créer un compte</span>
                </button>
            </div>
        </div>
    </div>-->
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "Login",
    data() {
        return {
            mode: 'login',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        }
    },
    mounted() {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/contacts');
        }
    },

    computed: {
        validatedFields() {
            let result;
            if (this.mode == 'create') {
                if (this.email != "" && this.firstName != "" && this.lastName != "" && this.password != "") {
                    result = true;
                } else {
                    result = false;
                }
            } else {
                if (this.email != "" && this.password != "") result = true; else result = false;
            }
            return result;
        },
        ...mapState(['status'])
    },
    methods: {
        switchToCreateAccount() {
            this.mode = "create";
        },
        switchToLogin() {
            this.mode = "login";
        },

        createAccount() {
            const retrievedThis = this;
            this.$store.dispatch('createAccount', {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
            }).then(response => {
                console.log("login response", response);
                retrievedThis.login();
            }).catch(error => {
                console.log('login error', error)
            });
        },
        login() {
            const retrievedThis = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            }).then(response => {
                console.log("login response", response);
                retrievedThis.$router.push('/contacts')
            }, error => {
                console.log('then error', error);
            }).catch(error => {
                console.log('login error', error)
            });
        }
    }
}
</script>


<style>
.auth-btn {
    background: #4fc08d;
    color: #fff;
}
.auth-btn:hover {
    background-color: #4caf50;
    color: white;
}
</style>