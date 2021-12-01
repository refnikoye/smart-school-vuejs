<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Admin Login </h4>
                        <hr>

                        <form @submit.prevent="login" >
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="school.email" placeholder="Please Enter School Email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" class="form-control" v-model="school.password" placeholder="Please Enter Password">
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div><br>
                            <button type="submit" class="btn btn-primary">LOGIN</button>
                            <router-link :to="{name: 'signup'}" class="btn btn-md btn-success btn-signup" >Sing Up</router-link>
                            <br><br>
                            <router-link :to="{name: 'userlogin'}" class="" >Login as User</router-link>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {

    setup() {

        const school = reactive({
            email: '',
            password: ''
        })

        const validation = ref([])
        const loginFailed = ref(null)
        const router = useRouter()

        function login() {

            let email = school.email
            let password = school.password

            console.log(email)

            axios.post('https://qodey.com/smart-shcool/laravel8/public/api/loginadmin', {
                email,
                password
            }).then(response => {

                if(response.data.success) {

                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('ID', response.data.data.school_id)
                   
                    return router.push({
                        name: 'admindashboard'
                    })
                }

                loginFailed.value = true

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        return {
            school,
            validation,
            loginFailed,
            login
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
    .btn-signup{
        float: right;
    }
</style>