<template>
    <div id="secure" v-if="user != null">
        <h1>Welcome {{user}}</h1>
        <h1>Users</h1>
        <div class="admin" v-if="admin">You are an admin</div>
        <ul
        v-for="(user, index) in Usuario"
        :key="index">
            <div v-if="user.isActive">
                <h4 v-if="user.isAdmin">Admin: : {{user.user}}</h4>
                <h4 v-else> User : {{user.user}}</h4>- email: {{user.email}}
                <br>-"{{user.bio}}"<br v-if="admin">
                <button v-if="admin" @click="editAdmin(user)">Edit user</button>
            </div>
        </ul>
        <button v-if="admin" @click="Inactive()">{{verb}} INACTIVE users</button>
        <div v-if="showInactive">
            <h1>Inactive users</h1>
            <ul
            v-for="(user, index) in Usuario"
            :key="index">
                <div v-if="user.isActive == false">
                    <h4 v-if="user.isAdmin">Admin: : {{user.user}}</h4>
                    <h4 v-else> User : {{user.user}}</h4>- email: {{user.email}}
                    <br>-"{{user.bio}}"<br v-if="admin">
                    <button v-if="admin" @click="editAdmin(user)">Edit user</button>
                </div>
        </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
            var user = JSON.parse(localStorage.getItem("currentUser"))
            return{
                Usuario: [],
                user : user.user,
                admin : user.isAdmin,
                showInactive : false,
                verb : "Show"
            }
        },
        methods:{
            async getData() {
                var aux = this
                this.axios.get('http://localhost:3000/api/user')
                .then((response) =>{
                    aux.Usuario = response.data.user
                })
                .catch((error) => { console.log(error) })
            },
            logout(){
                this.$emit('authenticated', false)
                this.$router.replace({name: 'login'})
            },
            editAdmin(user){
                localStorage.setItem("userEdit",JSON.stringify(user))
                this.$router.replace({ name: 'editAdmin' })
            },
            Inactive(){
                this.showInactive = !this.showInactive
                if(!this.showInactive)
                    this.verb = "Show"
                else this.verb = "Hide"
            },
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }
    .admin{
    color: orangered;
    font-size: 30px;
    text-align: center
    }
</style>