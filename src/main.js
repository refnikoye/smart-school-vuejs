import { createApp } from 'vue'
import App from './App.vue'

//import store from './store/index'

//import Comment from '@/components/Comment.vue'
//import Comments from '@/components/Comments.vue'
//import newComment from '@/components/NewComment.vue'



//import router
import router from './router'

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)

app.use(router)
app.mount('#app')
//app.use(store)
//app.component('comment', Comment)
//app.component('comments', Comments)
//app.component('newComment', newComment)

