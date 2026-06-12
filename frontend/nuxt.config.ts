export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  
  icon: {
    clientBundle: {
      scan: true,
      icons: [
        'lucide:layout-dashboard',
        'lucide:door-open',
        'lucide:calendar-check',
        'lucide:door-closed',
        'lucide:calendar-days',
        'lucide:users',
        'lucide:pie-chart',
        'lucide:plus',
        'lucide:list-checks',
        'lucide:shield',
        'lucide:calendar',
        'lucide:log-out',
        'lucide:user',
        'lucide:building-2',
        'lucide:search',
        'lucide:refresh-cw',
        'lucide:image',
        'lucide:calendar-plus',
        'lucide:info',
        'lucide:check',
        'lucide:x',
        'lucide:trash-2',
        'lucide:trash',
        'lucide:mail',
        'lucide:lock',
        'lucide:bell'
      ]
    }
  },
  
  routeRules: {
    '/api/**': {
      proxy: process.env.NUXT_API_PROXY || 'http://localhost:5000/api/**'
    }
  },
  
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  
  app: {
    head: {
      title: 'CoWork Space - Book Your Workspace',
      meta: [
        { name: 'description', content: 'Modern coworking space booking application' }
      ]
    }
  }
})
