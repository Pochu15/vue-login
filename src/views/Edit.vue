<template>
    <div id="Edit">
        <div style="edit">
            <h1 style="text-align:center">Welcome {{user}}, you're about to change your data</h1>
            <div class="admin" v-if="admin">You are an admin</div>
            <h2 style="text-align:center">Your Data</h2>
            New Username :  <input type="text" name="username" v-model="input.username" placeholder="Username">
            New email : <input type="text" name="email" v-model="input.email" placeholder="email"><br>
            New Biography: <textarea rows="4" cols="100" v-model="input.bio" placeholder="bio"></textarea><br>

            New  Password : <input type="password" name="password" v-model="input.newpassword" placeholder="Password"><br>
            Repeat the pwd: <input type="password" name="password2" v-model="input.newpassword2" placeholder="Password">
            Leave it on blank if you don't wan't to change it<br><br><br>


            Old password : <input type="password" name="oldpassword" v-model="input.password" placeholder="Password"><br>
            
            
            <button @click="editUser()">Submit</button> {{warning}}

        </div><br><br><br>
        <button @click="goBack()">Go back</button>
        <br><br><br><br><br>
        <button @click="deleteUser()">Click here to delete your user</button>
    </div>  
</template>

<script>
import App from '../App.vue'
export default {
    name: 'Edit',
    data(){
        var user = JSON.parse(localStorage.getItem("currentUser"))
        return{
            warning: "",
            user : user.user,
            admin: user.isAdmin,
            input: {
                username: user.user,
                password: "",
                email: user.email,
                bio: user.bio,
                newpassword: "",
                newpassword2: "",
            }
        }
    },
    methods:{
        goBack(){
            this.$router.replace({ name: "secure" })
        },
        async editUser(){
            if(this.input.password == ""){
                this.warning = "You must enter your old password before doing any changes"
            } else if (this.input.newpassword != this.input.newpassword2) {
                this.warning = "Passwords don't match"
            } else {
                var aux = this
                this.axios.get(`http://localhost:3000/api/user/${aux.user}`)
                .then((user) =>{
                    aux.warning = "Loading..."
                    this.axios.post(`http://localhost:3000/api/user/log`,{
                        user: aux.user,
                        pwd: aux.input.password
                    })
                    .then((response) =>{
                        this.axios.put(`http://localhost:3000/api/user/${aux.user}`,{
                            user: aux.input.username,
                            pwd: (aux.input.newpassword == ""?aux.input.password:aux.input.newpassword),
                            email : aux.input.email,
                            bio : aux.input.bio
                        })
                        .then((response) =>{
                            aux.warning = "Data changed succesfully"
                            localStorage.setItem("currentUser", JSON.stringify(response.data.updated))
                        })
                        .catch((error) =>{
                            aux.warning = "Error changing data."
                        })
                    })
                    .catch((error) => {
                        aux.warning = "Password incorrect. Change denied."
                    })
                })
                .catch((err) =>{
                    aux.warning = "Unexpected error!!"
                })
            }
        },
        async deleteUser(){
            if(this.input.password == ""){
                alert("You must enter your password before deleting your account!")
            } else {
                this.axios.post('http://localhost:3000/api/user/log',{
                    user: this.input.username,
                    pwd: this.input.password
                })
                .then((response) =>{
                    if(confirm("Are you REALLY sure you want to delete your user?")){
                    var aux = this
                    this.axios.put(`http://localhost:3000/api/user/remove/${this.user}`,)
                    .then((response) => {
                        alert("Your data will be kept for one month.\nIf you log in again, your account will be restored")
                        this.$emit("authenticated", false, null)
                        this.$router.replace({ name: "login" })
                    })
                    .catch((err) => {
                        alert("Error deleting your data. Try again in a few minutes")
                    })
                }
                })
                .catch((err) => {
                    alert("Password incorrect. Access denied.")
                })
            }
        }
    }
}
</script>

<style>
.admin{
    color: orangered;
    font-size: 30px;
    text-align: center
}
</style>
