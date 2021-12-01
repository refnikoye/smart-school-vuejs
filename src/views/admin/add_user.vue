<template>
    <Navbar/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Add User</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="user.email" placeholder="Please Enter Email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="role" class="font-weight-bold">Role</label>
                                <select class="form-select" v-model="user.role">
                                <option >Teacher</option>
                                <option >Student</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.role" class="mt-2 alert alert-danger">
                                    {{ validation.role[0] }}
                                </div>
                            </div><br>
                            <button type="submit" class="btn btn-primary">ADD USER</button>
                            
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
import Navbar from '@/components/Admin-Nav.vue'

export default {

    setup() {

        const user = reactive({
            email: '',
            role: ''
        })

        const validation = ref([])
        const router = useRouter()
        const school_id = localStorage.getItem('ID')

        function store() {

            let email = user.email
            let role = user.role

            axios.post('https://qodey.com/smart-school/laravel8/public/api/user', {
                email,
                role,
                school_id
            }).then(() => {

                router.push({
                    name: 'admindashboard'
                })

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        return {
            user,
            validation,
            router,
            store
        }

    },
    name: 'App',
    components : {
    Navbar
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