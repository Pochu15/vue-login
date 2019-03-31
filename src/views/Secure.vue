<template>
    <div id="secure">
        <h1>Usuarios</h1>
        <ul
        v-for="(user, index) in Usuario"
        :key="index">
            <div>
                <h3>{{user.user}}</h3> - email: {{user.email}} -
                <br>"{{user.bio}}"
                <!--<div v-if="">
                    <button>Mostrar Contraseña</button>
                </div>!-->
            </div>
        </ul>
        <button v-on:click="logout()">LogOut</button>
    </div>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
            return{
                Usuario: [],
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