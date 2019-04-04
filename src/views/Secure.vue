<template>
    <div id="secure">
        <h1>Welcome {{user}}</h1>
        <h1>Users</h1>
        <ul
        v-for="(user, index) in Usuario"
        :key="index">
            <div>
                <h4>Usuario : {{user.user}}</h4> - email: {{user.email}}
                <br>-"{{user.bio}}"
            </div>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
            var user = JSON.parse(localStorage.getItem("currentUser"))
            return{
                Usuario: [],
                user : user.user
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
            }
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
</style>