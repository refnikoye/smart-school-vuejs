<template>
    <Navbar/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>USER LIST </h4>
                        <hr>

                        <table class="table table-striped table-bordered mt-4">
                          <thead class="thead-dark">
                            <tr>
                                <th scope="col">USERNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">ROLE</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <td> {{user.username}} </td>
                                <td> {{user.email}} </td>
                                <td> {{user.role}} </td>
                                <td> <button @click="userDelete(user.user_id)" class="btn btn-danger">Delete User</button></td>
                                
                            </tr>
                          </tbody>
                        </table>
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import Navbar from '@/components/Admin-Nav.vue'

export default {
   
    setup() {
        
        const token = localStorage.getItem('token')
        const schoolid = localStorage.getItem('ID')
        const users = ref('')

        onMounted(() => {
    
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get(`http://localhost:8000/api/userbyschool/${schoolid}`)
            .then(response => {
                users.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function userDelete(id) {
            
        axios.delete(`https://qodey.com/smart-shcool/laravel8/public/api/user/${id}`)
        .then(() => {
            
            users.value.splice(users.value.indexOf(id));

            }).catch(error => {
                console.log(error.response.data)
            })

        }

        return {
            users,
            token,
            schoolid,
            userDelete
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
</style>