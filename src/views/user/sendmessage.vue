<template>
    <Navbar/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Send A Message</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="content" class="font-weight-bold">Content</label>
                                <textarea class="form-control" required rows="4" v-model="message.content" placeholder="Enter Your Message"></textarea>
                            
                            </div>
                            <br>
                            <button type="submit" class="btn btn-primary">SEND MESSAGE</button>
                            
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter, useRoute  } from 'vue-router'
import axios from 'axios'

import Navbar from '@/components/User-Nav.vue'

export default {

    setup() {

        const message = reactive({
            content: ''
        })

        const validation = ref([])
        const router = useRouter()
        const route = useRoute()
        
        const from_id = localStorage.getItem('userId')
        const to_id = route.params.id

        function store() {
            let content = message.content

            axios.post('https://qodey.com/smart-shcool/laravel8/public/api/user-message', {
                content,
                from_id,
                to_id

            }).then(() => {

                router.push({
                    name: 'userdashboard'
                })

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        return {
            message,
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