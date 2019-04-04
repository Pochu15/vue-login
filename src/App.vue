<template>
    <div id="app">
        <div id="nav">
            <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link><br v-if="authenticated">
            <router-link v-if="authenticated" to="/secure">Home</router-link><br v-if="authenticated">
            <router-link v-if="authenticated" to="/secure/edit">Edit</router-link>
        </div>
        <router-view @authenticated="setAuthenticated" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                currentuser: null
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status, user) {
                this.authenticated = status
                this.currentuser = user
                localStorage.setItem("currentUser", JSON.stringify(user))
            },
            logout() {
                this.authenticated = false;
                this.currentuser = null;
            },
        }
    }
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>