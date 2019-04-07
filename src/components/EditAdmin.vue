<template>
    <div v-if="currentuser.isAdmin" id="editAdmin">
        <h1 style="text-align:center">Welcome, {{currentuser.user}}. You're about to edit the user {{user.user}}</h1>
            <h2 style="text-align:center">{{user.user}}'s Data</h2>
            New Username :  <input type="text" name="username" v-model="input.username" placeholder="Username">
            New email : <input type="text" name="email" v-model="input.email" placeholder="email"><br>
            New Biography: <textarea rows="4" cols="100" v-model="input.bio" placeholder="bio"></textarea><br>
            New  Password : <input type="password" name="password" v-model="input.newpassword" placeholder="Password"><br>
            Repeat the pwd: <input type="password" name="password2" v-model="input.newpassword2" placeholder="Password"> 
            Leave it on blank if you don't want to change it
            <br><br><br>Is admin? :
            <input type="checkbox" id="isAdmin" v-model="input.isAdmin">
            
            <br><input type="password" name="A-pwd" v-model="input.password" placeholder="Admin's password">
            <button @click="editUser()">Submit</button> <p class="warning">{{warning}}</p>

        <br><br><br>
        <button @click="goBack()">Go back</button>
        <br><br><br><br><br>
        <button @click="deactivateUser()">{{verb}} user</button>
        <button @click="deleteUser()">Delete user</button>
    </div>
</template>

<script>
export default {
    name: 'editAdmin',
    data(){
        var currentuser = JSON.parse(localStorage.getItem("currentUser"))
        var user = JSON.parse(localStorage.getItem("userEdit"))
        return{
            currentuser : currentuser,
            user : user,
            input: {
                username: user.user,
                password: "",
                email: user.email,
                bio: user.bio,
                newpassword: "",
                newpassword2: "",
                isAdmin : user.isAdmin
            },
            warning : "",
            verb : ""
        }
    }, methods: {
        async editUser(){
            if(this.input.password == ""){
                this.warning = "You must enter your pasword to change this user data"
            } else if(this.input.newpassword != this.input.newpassword2){
                this.warning = "Passwords don't match!"
            } else {
                this.axios.post(`http://localhost:3000/api/user/log`, {
                    user: this.currentuser.user,
                    pwd: this.input.password
                })
                .then((response)=>{
                    if(this.input.newpassword == ""){
                        this.axios.put(`http://localhost:3000/api/user/${this.user.user}`, {
                            user: this.input.username,
                            email: this.input.email,
                            bio: this.input.bio,
                            isAdmin: this.input.isAdmin
                        })
                        .then((response) => { this.warning = "Data changed succesfully" })
                        .catch((err) => { this.warning = `Unexpected error ${err}`})
                    } else {
                        this.axios.put(`http://localhost:3000/api/user/${this.user.user}`, {
                            user: this.input.username,
                            pwd: this.input.newpassword,
                            email: this.input.email,
                            bio: this.input.bio,
                            isAdmin: this.input.isAdmin
                        })
                        .then((response) => { this.warning = "Data changed succesfully" })
                        .catch((err) => { this.warning = `Unexpected error ${err}`})
                    }
                })
                .catch((err) =>{
                    this.warning = "Wrong password. Change denied"
                })
            }
        },
        async deactivateUser(){
            if(this.input.password == ""){
                this.warning = "You must enter your password before deactivating this user."
            } else {
                this.axios.post(`http://localhost:3000/api/user/log`,{
                    user: this.currentuser.user,
                    pwd: this.input.password
                })
                .then((response) =>{
                    if(confirm("Are you really sure you want to "+(this.user.isActive?"de":"")+"activate this user?\n"+(this.user.isActive?"(This change can be undone.)":""))){
                        this.axios.put(`http://localhost:3000/api/user/remove/${this.user.user}`,)
                        .then((response) => {
                            if(this.user.isActive) alert("User deactivated correctly. If the user attemps to log in again, his account will be restored.")
                            else alert("The user is active again")
                            this.$router.replace({ name: "secure" })
                        })
                        .catch((err) => { this.warning = `Unexpected error: ${err}` })
                    }
                })
                .catch((err) => { this.warning = "Wrong password. Change denied." })
            }
        },
        async deleteUser(){
            if(this.input.password == ""){
                this.warning = "You must enter your password to delete this user."
            } else {
                this.axios.post(`http://localhost:3000/api/user/log`, {
                    user: this.currentuser.user,
                    pwd: this.input.password
                })
                .then((response) => {
                    if(confirm("Are you REALLY sure you want to delete this user?")){
                        if(confirm(`This action can't be undone. Are you REALLY sure you want to continue?`)){
                            this.axios.delete(`http://localhost:3000/api/user/${this.user.user}`)
                            .then((response) => {
                                alert("User deleted correctly. That's sad...!!")
                                this.$router.replace({ name: 'secure' })
                            })
                            .catch((err) => { alert(`Unexpected error. ${this.user.user}'s ass is safe... for now.`)})
                        }
                    }
                })
                .catch((err) => { this.warning="Wrong password. Change denied."})
            }
        }
    }, created(){
        this.verb = this.user.isActive?"Deactivate":"Activate"
    }

}
</script>

<style scoped>
    .warning{
        color: orangered
    }
</style>
