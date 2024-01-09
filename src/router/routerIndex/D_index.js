
import routerMain from '../../components/admPages/Adm_router_main.vue'
// import search from '../../pages/routerPages/D_searchPage.vue'
// import login from '../../pages/intro/Tal_login.vue'

export const routes = [
  {
    path: '/',
    name: 'routerMain',
    component: routerMain,
    children: [
      {
        path: '/',
        name: 'main',
        props: true,
        meta: {
          page: 1
        },
        component: () => import(/* webpackChunkName: "about" */ '../../components/admPages/Adm_main.vue')
      }
    ]
  }
]

export default routes
