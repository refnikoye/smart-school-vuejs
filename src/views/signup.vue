<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Sign Up Your School</h4>
                        <hr>

                        <form @submit.prevent="store" id="signup-form">
                            <span id="success"></span>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="school.email" placeholder="Please Enter Email">
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
                            </div>
                            <div class="form-group">
                                <label for="schoolname" class="font-weight-bold">Name</label>
                                <input type="text" class="form-control" v-model="school.name" placeholder="Please Enter School Name">
                                <!-- validation -->
                                <div v-if="validation.name" class="mt-2 alert alert-danger">
                                    {{ validation.name[0] }}
                                </div>
                            </div><br>
                            <button type="submit" class="btn btn-primary">SIGN UP</button>
                            <router-link :to="{name: 'login'}" class="btn btn-md btn-success btn-login" >Login</router-link>

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
            password: '',
            name: ''
        })

        const validation = ref([])
        const router = useRouter()

        function store() {

            let email = school.email
            let password = school.password
            let name = school.name

            axios.post('https://qodey.com/smart-shcool/laravel8/public/api/school', {
                email: email,
                password: password,
                name: name
            }).then(() => {

                router.push({
                    name: 'login'
                })

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        //return
        return {
            school,
            validation,
            router,
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
    .btn-login{
        float:right
    }
</style>