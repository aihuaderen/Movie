import Vue from 'vue'
import App from './App'
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
Vue.use(NavigationBar)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
