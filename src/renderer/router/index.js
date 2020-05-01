import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Default',
      component: Default
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
      // props: true,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }

  ]
})