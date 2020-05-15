import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Projects from '@/components/Projects'
import Droplets from '@/components/Droplets'
import Kubernetes from '@/components/Kubernetes'
import Jobs from '@/components/Jobs'
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
    },
    {
      path: '/droplets',
      name: 'Droplets',
      component: Droplets 
    },
    {
      path: '/kubernetes',
      name: 'Kubernetes',
      component: Kubernetes 
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: Jobs
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }

  ]
})