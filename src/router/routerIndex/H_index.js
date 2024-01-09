
import admRouterMain from '../../pages/Adm_router_main.vue'
// import search from '../../pages/routerPages/D_searchPage.vue'
// import login from '../../pages/intro/Tal_login.vue'

export const routes = [
  {
    path: '/',
    name: 'admRouterMain',
    component: admRouterMain,
    children: [
      {
        path: '/',
        name: 'main',
        props: true,
        meta: {
          page: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '@/components/admPages/adm_main.vue')
      }
    ]
  }
]

export default routes
