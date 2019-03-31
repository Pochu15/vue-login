<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
        <div class="warning">
            {{message}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                message: ""
            }
        },
        methods: {
            async login() {
                var aux = this
                this.axios.post('http://localhost:3000/api/user/log',{
                    email: this.input.username,
                    pwd: this.input.password
                })
                .then((response) => {
                    console.log(response)
                    if(response.status == 200) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "secure" });
                    } else {
                        console.log("The username and / or password is incorrect")
                        aux.message = "The username and / or password is incorrect"
                    }
                })
                .catch((error) => {
                    console.log(error)
                    aux.message = "A username and password must be present"
                    console.log("A username and password must be present")
                })
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
    .warning{
        color : red;
        font-family:Verdana, Geneva, Tahoma, sans-serif
    }
</style>