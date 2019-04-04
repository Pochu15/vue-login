<template>
    <div id="Edit">
        <div style="edit">
            <h1 style="text-align:center">Welcome {{user}}, you're about to change your data</h1>
            {{warning}}
            <div class="admin" v-if="admin">You are an admin</div>
            <h2 style="text-align:center">Your Data</h2>
            New Username :  <input type="text" name="username" v-model="input.username" placeholder="Username">
            New email : <input type="text" name="email" v-model="input.email" placeholder="email"><br>
            New Biography: <textarea rows="4" cols="100" v-model="input.bio" placeholder="bio"></textarea><br>

            New  Password : <input type="password" name="password" v-model="input.newpassword" placeholder="Password"><br>
            Repeat the pwd: <input type="password" name="password2" v-model="input.newpassword2" placeholder="Password">
            Leave it on blank if you don't wan't to change it<br><br><br>


            Old password : <input type="password" name="oldpassword" v-model="input.password" placeholder="Password"><br>
            
            
            <button>Submit</button> {{message}}

        </div><br><br><br>
        <button @click="goBack()">Go back</button>
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
                oldpassword: "",
                email: user.email,
                bio: user.bio,
                newpassword: "",
            }
        }
    },
    methods:{
        goBack(){
            this.$router.replace({ name: "secure" })
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
