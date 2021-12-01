<template>
    <Navbar/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>USER LIST </h4>
                        <hr>
                        <div id="userlist"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted } from 'vue'
import Navbar from '@/components/User-Nav.vue'

export default {
    setup() {

        const token = localStorage.getItem('token')
        const userrole = localStorage.getItem('userrole')
        const school_id = localStorage.getItem('schoolId')
        let showdata = ``

        onMounted(() => {
           
            axios.defaults.headers.common.Authorization = `Bearer ${token}`
            axios.get(`https://qodey.com/smart-school/laravel8/public/api/userbyschool/${school_id}`)
            .then(response => {
            const teacherObjects = response.data.data.filter(user => user.role === 'Teacher')
            const studentObjects = response.data.data.filter(user => user.role === 'Student')
            if(userrole === 'Teacher') {
                showdata += `
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="teacher-tab" data-bs-toggle="tab" href="#teacher" role="tab" aria-controls="teacher" aria-selected="true">TEACHERS</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="student-tab" data-bs-toggle="tab" href="#student" role="tab" aria-controls="student" aria-selected="false">STUDENTS</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
                        <table class="table table-striped table-bordered mt-4">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">USERNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>`
                        teacherObjects.forEach((teacher) => {
                        showdata +=`    
                            <tr >
                                <td>${ teacher.username }</td>
                                <td>${ teacher.email }</td>
                                <td class="text-center">
                                    <a href="sendmessage/${teacher.user_id}" class="btn btn-primary">Send Message</a>
                                </td>
                            </tr>`
                        })
                        showdata +=`
                        </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="student" role="tabpanel" aria-labelledby="student-tab">
                        <table class="table table-striped table-bordered mt-4">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">USERNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">OPTIONS</th>
                            </tr>
                        </thead>
                        <tbody>`
                        studentObjects.forEach((student) => {
                        showdata +=`
                            <tr>
                                <td>${ student.username }</td>
                                <td>${ student.email }</td>
                                <td class="text-center">
                                    <a href="sendmessage/${student.user_id}" class="btn btn-primary">Send Message</a>
                                </td>
                            </tr>`
                        })
                        showdata +=`
                        </tbody>
                        </table>
                    </div>
                </div>`
            }else if(userrole === 'Student') {
                showdata += ` 
                <table class="table table-striped table-bordered mt-4">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">USERNAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">OPTIONS</th>
                        </tr>
                    </thead>
                    <tbody>`

                studentObjects.forEach((student) => {
                    showdata += `
                      <tr>
                        <td>${ student.username }</td>
                        <td>${ student.email }</td>
                        <td class="text-center">
                            <a href="sendmessage/${student.user_id}" class="btn btn-primary">Send Message</a>
                        </td>
                      </tr>`
                });
              
                showdata += ` 
                    </tbody>
                </table>`

              document.getElementById("userlist").innerHTML= showdata                    

            }else {
              showdata += `User Role Not Found`
            }     
            document.getElementById("userlist").innerHTML = showdata           
            
            }).catch(error => {
            console.log(error.response.data)
            })

        })
        
        return {
            token
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




