<template>
  <ul >
      <li ><router-link :to="{name: 'userdashboard'}">Home</router-link></li>
      <li  v-for="(item, index) in messages" :key="index" >
                          <a href="">{{ item }} notif</a></li>
      <li @click.prevent="logout"><a href="">Logout</a></li>
  </ul>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
//import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export default {
   
    setup() {
        
        const token = localStorage.getItem('token')
        const userID = localStorage.getItem('userId')
        const router = useRouter()
        const messages = []



        onMounted(() => {
            if(!token) {
                return router.push({
                    name: 'userlogin'
                })
            }

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get(`https://qodey.com/smart-shcool/laravel8/public/api/user-message/${userID}`)
            .then(response => {
                console.log(response)
                Pusher.logToConsole = true;

                var pusher = new Pusher('0f5c71af7372b27757c5', {
                cluster: 'ap1'
                });

                var channel = pusher.subscribe('smart-school');
                channel.bind('newMessage', function(data) {
                console.log(data)
                messages.push(JSON.stringify(data));
                });

              
              

            }).catch(error => {
                console.log(error.response.data)
            })

            

        })

        function logout() {

            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.post('http://localhost:8000/api/logoutuser')
            .then(response => {

                if(response.data.success) {

                    //remove localStorage
                    localStorage.removeItem('token')

                    return router.push({
                        name: 'userlogin'
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
            logout,
            messages
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