<template>
    <section class="container-fluid bg">
        <section class="row justify-content-center">
            <section class="col-12 col-sm-6 col-md-3">
                <div class="form-container">
                    <h3 class="text-center" v-if="mode == 'login'">Connexion</h3>
                    <h3 class="text-center" v-else>Inscription</h3>

                    <small v-if="mode == 'login'" id="emailHelp" class="form-text text-muted">
                        Vous n'avez pas de compte ?
                        <a class="btn" @click="switchToCreateAccount">
                            <span style="color : #4fc08d;">créer un compte</span>
                        </a>
                    </small>
                    <small v-else id="emailHelp" class="form-text text-muted">
                        Vous avez déjà un compte ?
                        <a class="btn" @click="switchToLogin">
                            <span style="color : #4fc08d;">Connectez-vous</span>
                        </a>
                    </small>

                    <div v-if="mode == 'create'">
                        <div
                            class="alert alert-info"
                            v-if="createAccountMessage"
                        >{{ createAccountMessage }}</div>
                    </div>

                    <form>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                v-model="email"
                                type="email"
                                class="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Veuillez saisir votre email"
                            />
                        </div>
                        <div v-if="mode == 'create'" class="form-group">
                            <label for="firstname">Prénoms</label>
                            <input
                                v-model="firstName"
                                type="text"
                                class="form-control"
                                id="firstname"
                                placeholder="Veuillez saisir votre prénom"
                            />
                        </div>
                        <div v-if="mode == 'create'" class="form-group">
                            <label for="lastName">Nom</label>
                            <input
                                v-model="lastName"
                                type="text"
                                class="form-control"
                                id="lastName"
                                placeholder="Veuillez saisir votre nom"
                            />
                        </div>

                        <div class="form-group">
                            <label for="password">Mot de passe</label>
                            <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="password"
                                placeholder="Veuillez saisir votre mot de passe"
                            />
                            <small
                                v-if="mode == 'create'"
                                class="form-text text-muted"
                            >Le mot de passe doit comporter au moins 6 caractères</small>
                        </div>
                    </form>
                    <div v-if="mode == 'create'">
                        <div v-if="status == 'EMAIL_EXISTS'">
                            <small class="form-text text-muted text-center">
                                <span style="color: red;">Cet email est déjà utilisé</span>
                            </small>
                            <br />
                        </div>
                        <div v-else-if="status == 'INVALID_EMAIL'">
                            <small class="form-text text-muted text-center">
                                <span style="color: red;">Cet email est invalide</span>
                            </small>
                            <br />
                        </div>
                        <div v-else-if="status == 'PASSWORD_MIN_LENGTH_ERROR'">
                            <small class="form-text text-muted text-center">
                                <span
                                    style="color: red;"
                                >Le mot de passe doit comporter au moins 6 caractères</span>
                            </small>
                            <br />
                        </div>
                        <div v-else-if="status == 'FIRSTNAME_MIN_LENGTH_ERROR'">
                            <small class="form-text text-muted text-center">
                                <span
                                    style="color: red;"
                                >Le prénom doit comporter au moins 2 caractères</span>
                            </small>
                            <br />
                        </div>
                        <div v-else-if="status == 'LASTNAME_MIN_LENGTH_ERROR'">
                            <small class="form-text text-muted text-center">
                                <span
                                    style="color: red;"
                                >Le nom doit comporter au moins 2 caractères</span>
                            </small>
                            <br />
                        </div>
                        <div v-else-if="status == 'INTERNAL_ERROR'">
                            <small class="form-text text-muted text-center">
                                <span
                                    style="color: red;"
                                >Une erreur s'est produite. Veuillez réessayer plus tard</span>
                            </small>
                            <br />
                        </div>
                    </div>

                    <div v-if="mode == 'login'">
                        <div v-if="status == 'USER_NOT_FOUND'">
                            <small class="form-text text-muted text-center">
                                <span style="color: red;">Cet utilisateur est introuvable</span>
                            </small>
                            <br />
                        </div>
                        <div v-if="status == 'PASSWORD_INCORRECT'">
                            <small class="form-text text-muted text-center">
                                <span style="color: red;">Mot de passe incorrect</span>
                            </small>
                            <br />
                        </div>
                    </div>
                    <button
                        v-if="mode == 'login'"
                        @click="login"
                        type="submit"
                        class="btn btn-block auth-btn"
                        :disabled="!validatedFields"
                    >
                        <span v-if="status == 'loading'">Chargement...</span>
                        <span v-else>Se connecter</span>
                    </button>

                    <button
                        @click="createAccount"
                        v-else
                        type="submit"
                        class="btn btn-block auth-btn"
                        :disabled="!validatedFields"
                    >
                        <span v-if="status == 'loading'">Chargement...</span>
                        <span v-else>Créer un compte</span>
                    </button>
                </div>
            </section>
        </section>
    </section>
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
            createAccountMessage: '',
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
            // retrievedThis.login();
            // const retrievedThis = this;
            this.createAccountMessage = "";
            this.$store.dispatch('createAccount', {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
            }).then(response => {
                console.log("create account response", response);
                this.email = "";
                this.firstName = "";
                this.lastName = "";
                this.password = "";
                this.createAccountMessage = "Compte crée avec succès. Veuillez-vous connecter";

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

.bg {
    background: url("../assets/bg.jpg") no-repeat;
    width: 100%;
    height: 100vh;
    background-size: 200%;
}

.form-container {
    position: absolute;
    top: 15vh;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #000;
}
@media only screen and (max-width: 678px) {
    .bg {
        background-size: 300%;
    }
}
</style>