<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-lg-6">
                <h3 style="color: #4fc08d">Ajouter un contact</h3>
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
                    <div class="form-group">
                        <input
                            type="tel"
                            name="phone"
                            class="form-control"
                            placeholder="Numéro de téléphone"
                            v-model="newContact.phone"
                        />
                    </div>
                </form>

                <h1>{{ phone }}</h1>
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


export default {
    name: 'AddContact',
    components: {},
    data() {
        return {
            baseUrl: "http://localhost:3000/api/v1",
            isLoading: false,
            newContact: {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            errorMessage: "",
            successMessage: "",
            phone: "", //for test
        }
    },
    methods: {
        async saveContact() {
            this.initErrorMessage();
            this.isLoading = true;
            try {
                const response = await axios.post(`${this.baseUrl}/contact`, {
                    firstName: this.newContact.firstName,
                    lastName: this.newContact.lastName,
                    email: this.newContact.email,
                    phone: this.newContact.phone,
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
    background: #4fc08d;
    color: #fff;
}
.save-btn:hover {
    background-color: #4caf50;
    color: white;
}
</style>



