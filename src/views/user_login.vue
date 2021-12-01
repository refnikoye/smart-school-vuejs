<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>User Login </h4>
                        <hr>

                        <form @submit.prevent="login" >
                            <div class="form-group">
                                <label for="id" class="font-weight-bold">School Id</label>
                                <input type="text" class="form-control" v-model="user.schoolid" placeholder="Please Enter School Id">
                                <!-- validation -->
                                <div v-if="validation.school_id" class="mt-2 alert alert-danger">
                                    {{ validation.school_id[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="username" class="font-weight-bold">Username</label>
                                <input type="text" class="form-control" v-model="user.username" placeholder="Please Enter  Username">
                                <!-- validation -->
                                <div v-if="validation.username" class="mt-2 alert alert-danger">
                                    {{ validation.username[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" class="form-control" v-model="user.password" placeholder="Please Enter Password">
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div><br>
                            <button type="submit" class="btn btn-primary">LOGIN</button>
                            <br><br>
                            <router-link :to="{name: 'login'}" class="" >Login as Admin</router-link>
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

        const user = reactive({
            username: '',
            password: '',
            school_id: ''
        })

        const validation = ref([])
        const loginFailed = ref(null)
        const router = useRouter()

        function login() {

            let username = user.username
            let password = user.password
            let school_id = user.schoolid

            axios.post('https://qodey.com/smart-school/laravel8/public/api/loginuser', {
                username,
                password,
                school_id
            }).then(response => {

                if(response.data.success) {

                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('userrole', response.data.data.role)
                    localStorage.setItem('userId', response.data.data.user_id)
                    localStorage.setItem('schoolId', school_id)

                    return router.push({
                        name: 'userdashboard'
                    })
                }

                loginFailed.value = true

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        return {
            user,
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