<template>
    <div id="register">
        <div style="register">
            <h1>Wellcome! You're about to register in this awesome page!</h1>
            <input type="text" name="username" v-model="input.email" placeholder="Email"/><br>
            <input type="text" name="username" v-model="input.username" placeholder="user"/><br>
            <input type="password" name="password" v-model="input.password" placeholder="Password" /><br>
            <input type="password" name="password" v-model="input.password2" placeholder="Repeat your password"/><br>
            <button @click="register()">Register</button>
            {{warning}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data(){
        return{
            input:{
                email: "",
                username: "",
                password: "",
                password2: ""
            },
            warning: ""
        }
    }, methods:{
        register(){
            if(this.input.password == "" || this.input.email == "" || this.input.username == "" || this.input.password2 == ""){
                this.warning = "You must fill all the fields"
            }
            else if(this.input.password != this.input.password2){
                this.warning = "Passwords do not match."
            } else {
                this.warning = "Loading..."
                var vue = this
                this.axios.post('http://localhost:3000/api/user',{
                    user: vue.input.username,
                    pwd: vue.input.password,
                    email: vue.input.email
                })
                .then((response) =>{
                    vue.warning = "User registered"
                })
                .catch((err) => {
                    vue.warning = `Error. Ya existe un usuario registrado con ese nombre / email`
                })
            }
        }
    }
}
</script>

<style scoped>

</style>