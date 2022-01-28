<template>
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
                    <router-link to="/contacts" class="nav-item nav-link">Mes contacts</router-link>
                    <router-link to="/add-contact" class="nav-item nav-link">Ajouter un contact</router-link>
                    <router-link to="/profile" class="nav-item nav-link">Mon profil</router-link>
                    <router-link to="/about" class="nav-item nav-link">À propos</router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    name: 'NavBar',

}
</script>