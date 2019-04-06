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
        <button @click="deactivateUser()">Deactivate user</button>
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
            warning : ""
        }
    }, methods : {
        goBack(){
            localStorage.setItem("userEdit", null)
            this.$router.replace({ name: "secure" })
        },
        async checkpwd(pwd){
            var bool = false
            if(pwd == ""){
                this.warning = "You must enter your password to edit this user's data"
            } else {
                this.axios.post('http://localhost:3000/api/user/log', {
                    user: this.currentuser.user,
                    pwd: pwd
                })
                .then((response) => {bool = true})
                .catch((error) => {alert("Wrong password. Changed denied.")})
                return bool
            }

        },
        editUser(){
            if(this.input.newpassword == this.input.newpassword2){
                if(this.checkpwd(this.input.password)){
                    if(confirm("Are you sure you want to change this user's data?")){
                        if(this.input.pwd != ""){
                            this.axios.put(`http://localhost:3000/api/user/${this.user.user}`,{
                            user: this.input.username,
                            pwd: this.input.pwd,
                            email: this.input.email,
                            bio: this.input.bio,
                            isAdmin: this.input.isAdmin

                            })
                            .then((response) =>{
                                this.warning = "Data changed succesfully"
                                localStorage.setItem("userEdit", null)
                                this.$router.replace({name: "secure"})
                            })
                            .catch((error) =>{
                                this.warning = "Error changing data."
                            })
                        } else {
                            this.axios.put(`http://localhost:3000/api/user/${this.user.user}`,{
                            user: this.input.username,
                            email: this.input.email,
                            bio: this.input.bio,
                            isAdmin: this.input.isAdmin

                            })
                            .then((response) =>{
                                this.warning = "Data changed succesfully"
                                localStorage.setItem("userEdit", null)
                                this.$router.replace({name: "secure"})
                            })
                            .catch((error) =>{
                                this.warning = "Error changing data."
                            })
                        }
                    }
                }
            } else this.warning = "Passwords do not match!"
        }
    },

}
</script>

<style scoped>
    .warning{
        color: orangered
    }
</style>
