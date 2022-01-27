<template>
    <div id="app">
        <div class="spinner-border text-info my-spinner" role="status" v-if="this.isLoading">
            <span class="sr-only">Loading...</span>
        </div>

        <div class="container" v-else>
            <div class="row mt-5">
                <div class="col-lg-6">
                    <h3 style="color: #4fc08d">Liste des contacts</h3>
                </div>
            </div>
            <hr style="color: grey" />
            <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="alert alert-success" v-if="successMessage">{{ successMessage }}</div>
            <!-- Delete Many Contacts -->
            <div class="row" v-if="this.deleteIds.length > 0">
                <div class="col-md-12 mt-1 mb-1">
                    <button
                        class="btn btn-sm btn-outline-danger"
                        @click="deleteManyContacts"
                    >Supprimer</button>
                </div>
            </div>
            <!-- End of delete many contacts -->
            <!-- Controle si le tableau est vide -->
            <!-- List of contacts -->

            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr class="text-center text-light" bgcolor="#4fc08d">
                                <th>
                                    <input
                                        type="checkbox"
                                        v-model="multipleSelect"
                                        @change="selectAllContacts"
                                    />
                                </th>
                                <th>N°</th>
                                <th>Illustration</th>
                                <th>Noms</th>
                                <th>Numéro de téléphone</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="text-center"
                                v-for="(contact, i) in contacts"
                                :key="contact._id"
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        v-model="deleteIds"
                                        @change="selectSingleContact"
                                        :value="contact._id"
                                    />
                                </td>
                                <td class="text-center">{{ i + 1 }}</td>
                                <td class="text-center">
                                    <!-- <div
                                        v-if="i + 1 % 2 == 0"
                                        style="background: #808080;"
                                        class="circle-avatar-with-letter"
                                    >{{ contact.firstName[0].toUpperCase() }}</div>
                                    <div
                                        v-else
                                        style="background: #17a2b8 ;"
                                        class="circle-avatar-with-letter"
                                    >
                                        {{
                                            contact.firstName[0].toUpperCase()
                                        }}
                                    </div>-->
                                </td>
                                <td
                                    style="text-align: center;"
                                >{{ contact.firstName }} {{ contact.lastName }}</td>
                                <td>{{ contact.phone }}</td>
                                <td>{{ contact.email }}</td>

                                <td>
                                    <a
                                        href="#"
                                        class="text-success"
                                        @click="showEditModal = true; selectContact(contact)"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    &nbsp;
                                    <a
                                        href="#"
                                        class="text-danger"
                                        @click="deleteContact(contact._id, contact.firstName)"
                                    >
                                        <i class="fas fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                class="text-center"
                v-if="this.contacts.length == 0"
            >Vous n'avez aucun contact pour le moment</div>
        </div>
        <!-- End of contacts List -->

        <!-- Edit Modal form -->
        <div id="overlay" v-if="showEditModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modifier un contact</h5>
                        <button type="button" class="close" @click="showEditModal = false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="editedFirstName">Prénoms</label>
                                <input
                                    id="editedFirstName"
                                    type="text"
                                    name="editedFirstName"
                                    class="form-control"
                                    v-model="editedFirstName"
                                />
                            </div>
                            <div class="form-group">
                                <label for="editedLastName">Nom</label>
                                <input
                                    id="editedLastName"
                                    type="text"
                                    name="editedLastName"
                                    class="form-control"
                                    v-model="editedLastName"
                                />
                            </div>
                            <div class="form-group">
                                <label for="editedEmail">Email</label>
                                <input
                                    id="editedEmail"
                                    type="email"
                                    name="editedEmail"
                                    class="form-control"
                                    v-model="editedEmail"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="tel"
                                    name="editedPhone"
                                    class="form-control"
                                    v-model="editedPhone"
                                />
                            </div>
                        </form>
                        <div class="row col-lg-3">
                            <div class="form-group">
                                <button
                                    class="btn edit-btn"
                                    @click="showEditModal = false; updateContact()"
                                >Modifier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of edit modal fom -->
    </div>
</template>

<script>

import axios from 'axios';
export default {
    name: 'App',
    data() {
        return {
            isLoading: false,
            errorMessage: "",
            successMessage: "",
            showEditModal: false,
            baseUrl: window.baseurl,
            contacts: [],
            newContact: {
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            currentContact: {},
            //
            multipleSelect: false,
            deleteIds: [],
            editedFirstName: "",
            editedLastName: "",
            editedEmail: "",
            editedPhone: "",
            editedId: "",
            //
            token: "",
        };
    },
    mounted() {
        if (this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return;
        } else {
            this.token = this.$store.state.user.token;
        }
        this.getContacts();

    },
    methods: {
        initErrorMessage() {
            this.successMessage = "";
            this.errorMessage = "";
        },
        async getContacts() {
            this.isLoading = true;
            try {
                const response = await axios.get(`${this.baseUrl}/contacts`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.isLoading = false;
                this.contacts = response.data.contacts;
            } catch (err) {
                this.isLoading = false;
                if (err.response.status == 401) {
                    this.errorMessage = err.response.data.message;
                    console.log('Erreur de validation : ', err.response.data.message);
                } else {
                    console.log('La création a échoué');
                    this.errorMessage = "La récupération a échoué";

                }
            }
        },
        async updateContact() {
            this.initErrorMessage();
            console.log('editedId', this.editedId);
            try {
                const response = await axios.put(`${this.baseUrl}/contact/${this.editedId}`, {
                    firstName: this.editedFirstName,
                    lastName: this.editedLastName,
                    email: this.editedEmail,
                    phone: this.editedPhone,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                });
                this.editedId = "";
                this.editedFirstName = "";
                this.editedFirstName = "";
                this.editedEmail = "";
                this.editedPhone = "";
                console.log('response', response);
                this.successMessage = response.data.message
                this.getContacts();
            } catch (err) {
                if (err.response.status == 422) {
                    this.errorMessage = err.response.data.message;
                    console.log('Erreur de validation : ', err.response.data.message);
                } else {
                    console.log('La création a échoué');
                    this.errorMessage = "La création a échoué";

                }
            }
        },
        async deleteContact(contactId, firstName) {
            this.initErrorMessage();
            if (window.confirm(`Voulez vous supprimer ${firstName}`)) {
                console.log('id', contactId);
                console.log('confirmation');
                try {
                    const response = await axios.delete(`${this.baseUrl}/contact/${contactId}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });
                    console.log('response', response);
                    this.successMessage = response.data.message
                    this.getContacts();
                } catch (error) {
                    console.log('deleteContact catch error', error.message);
                    this.errorMessage = "La suppression a échoué";
                }
            }

        },
        selectContact(contact) {
            this.editedId = contact._id;
            this.editedFirstName = contact.firstName;
            this.editedLastName = contact.lastName;
            this.editedEmail = contact.email;
            this.editedPhone = contact.phone;

        },

        //
        selectAllContacts() {
            if (this.multipleSelect == true) {
                this.deleteIds = [];
                for (var i = 0; i < this.contacts.length; i++) {
                    // console.log(this.contacts[i]['_id']);
                    this.deleteIds.push(this.contacts[i]['_id']);
                }
            } else {
                this.deleteIds = [];
            }

        },
        selectSingleContact() {
            if (this.contacts.length == this.deleteIds.length) {
                this.multipleSelect = true;
            } else {
                this.multipleSelect = false;
            }
        },
        deleteManyContacts() {
            this.initErrorMessage();
            if (this.deleteIds.length != 0) {
                if (window.confirm(`Voulez-vous supprimer les ${this.deleteIds.length} contacts selectionnés ?`)) {
                    console.log('Suppression multiple');

                    axios({
                        method: "post",
                        url: `${this.baseUrl}/delete-many-contacts`,
                        data: { ids: this.deleteIds },
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                        .then(response => {
                            console.log("response", response);
                            this.successMessage = response.data.message
                            this.deleteIds = [];
                            this.getContacts();
                        })
                        .catch(err => {
                            console.log('error', err);
                        });
                }
            } else {
                alert('Aucune entrée selectionnée');
            }
        }
    },



}
</script>


<style>
#overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}

.circle-avatar-with-letter {
    margin: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    color: #fff;
}
.my-spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 50%;
    right: 50%;
    color: red;
}

.edit-btn {
    background: #4fc08d;
    color: #fff;
}
.edit-btn:hover {
    background-color: #4caf50;
    color: white;
}
</style>