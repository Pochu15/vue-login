<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
        <div class="warning">
            {{message}}
        </div>

        <div>
            <h2>Create an account</h2>
            <div class="register">
                <button type="button" @click="gotoreg()">register</button>
            </div>
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
                    user: this.input.username,
                    pwd: this.input.password
                })
                .then((response) => {
                    this.$emit("authenticated", true, response.data.user)
                    this.$router.replace({ name: "secure" })
                })
                .catch((error) => {
                    if(this.input.username == '' || this.input.password == ''){
                        aux.message = "A username and password must be present"
                        console.log("A username and password must be present")
                    } else {
                        console.log("The username and / or password is incorrect")
                        aux.message = "The username and / or password is incorrect"
                    }
                })
            },
            gotoreg(){
                this.$router.replace({name: "register"})
            }
        }, created : function(){
            this.$emit("authenticated", false, null)
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
    .register{
        display: flex;
        justify-content: center
    }
</style>