<template>
  <ul >
      <li ><router-link :to="{name: 'admindashboard'}">Home</router-link></li>
      <li ><router-link :to="{name: 'add_user'}">Add User</router-link></li>
      <li @click.prevent="logout"><a href="">Logout</a></li>
  </ul>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'


export default {
   
    setup() {
        
        const token = localStorage.getItem('token')
        const router = useRouter()

        onMounted(() => {
            if(!token) {
                return router.push({
                    name: 'login'
                })
            }

        })

        function logout() {

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('https://qodey.com/smart-school/laravel8/public/api/logoutadmin')
            .then(response => {

                if(response.data.success) {

                    //remove localStorage
                    localStorage.removeItem('token')

                    return router.push({
                        name: 'login'
                    })

                }

            })
            .catch(error => {
                console.log(error.response.data)
            })

        }

        //return
        return {
            token,
            logout
        }

    }

}
</script>

<style scoped>
 ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #524352;
 }

 li {
    float: left;
    text-align: center;
    color: white;
 }

 li a {
    display: block;
    color: white;
    text-decoration: none;
    padding: 14px 10px;
 }

 li a:hover:not(.active) {
     background-color: thistle;
 }

 .active {
     background-color: whitesmoke;
 }
</style>