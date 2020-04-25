import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Projects from '@/components/Projects'
import Settings from '@/components/Settings'
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
      props: true,
      component: Projects
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }

  ]
})