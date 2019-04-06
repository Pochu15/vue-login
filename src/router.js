import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./views/Login.vue"
import SecureComponent from "./views/Secure.vue"
import RegisterComponent from "./components/Register.vue"
import EditComponent from "./views/Edit.vue"
import EditAdmin from "./components/EditAdmin.vue"

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
            path: "/register",
            name: "register",
            component: RegisterComponent
        },
        {
            path: "/secure/edit",
            name: "edit",
            component: EditComponent
        },
        {
            path: "/secure/admin/edit",
            name: "editAdmin",
            component: EditAdmin
        }
    ]
})