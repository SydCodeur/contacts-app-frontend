<template>
    <NavBar />
    <div class="container">
        <div class="row mt-5">
            <div class="col-lg-6">
                <h3 style="color: #4267b2">Ajouter un contact</h3>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-6">
                <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
                <div class="alert alert-success" v-if="successMessage">{{ successMessage }}</div>
                <form>
                    <div class="form-group">
                        <label for="firstName">Prénoms</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            class="form-control"
                            placeholder="Saisir les prénoms"
                            v-model="newContact.firstName"
                        />
                    </div>
                    <div class="form-group">
                        <label for="lastName">Nom</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            class="form-control"
                            placeholder="Saisir le nom"
                            v-model="newContact.lastName"
                        />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            class="form-control"
                            placeholder="Saisir l'email"
                            v-model="newContact.email"
                        />
                    </div>
                    <!-- <div class="form-group">
                        <input
                            type="tel"
                            name="phone"
                            class="form-control"
                            placeholder="Numéro de téléphone"
                            v-model="newContact.phone"
                        />
                    </div>-->
                </form>
                <label>Numéro de téléphone</label>
                <vue-tel-input
                    placeholder="Saisir le numéro"
                    :value="newContact.phone"
                    @input="onInput"
                ></vue-tel-input>

                <br />
                <div class="row">
                    <div class="col-lg-3" v-if="this.isLoading">
                        <div class="spinner-border text-info" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div class="col-lg-4" v-else>
                        <button class="btn save-btn" @click="saveContact()">
                            <i class="fas fa-save"></i>&nbsp;&nbsp;Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import NavBar from '../components/NavBar.vue';


export default {
    name: 'AddContact',
    components: {
        NavBar
    },
    data() {
        return {
            baseUrl: window.baseurl,
            isLoading: false,
            newContact: {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            errorMessage: "",
            successMessage: "",

        }
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        } else {
            this.token = this.$store.state.user.token;
            console.log('this.token', this.token);
        }

    },
    methods: {
        onInput(phone, phoneObject, input) {
            console.log('input', input);
            if (phoneObject?.formatted) {
                this.newContact.phone = phoneObject.formatted
            }
        },
        async saveContact() {
            this.initErrorMessage();
            this.isLoading = true;
            try {
                const response = await axios.post(`${this.baseUrl}/contact`, {
                    firstName: this.newContact.firstName,
                    lastName: this.newContact.lastName,
                    email: this.newContact.email,
                    phone: this.newContact.phone,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                console.log('response', response);
                this.isLoading = false;
                this.successMessage = response.data.message
                this.newContact = {};
            } catch (err) {
                this.isLoading = false;
                if (err.response.status == 422) {
                    this.errorMessage = err.response.data.message;
                    console.log('Erreur de validation : ', err.response.data.message);
                } else {
                    console.log('La création a échoué');
                    this.errorMessage = "La création a échoué";

                }
            }

        },
        initErrorMessage() {
            this.successMessage = "";
            this.errorMessage = "";
        }
    }
}
</script>

<style>
.save-btn {
    background: #4267b2;
    color: #fff;
}
.save-btn:hover {
    background-color: #4267b2;
    color: white;
}
</style>



