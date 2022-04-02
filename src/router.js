import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage";
import GameBrowser from "@/views/GameBrowser";
import HomePage from "@/views/HomePage";
import {store} from "@/store";
import DemoPage from "@/views/DemoPage";
import AboutPage from "@/views/AboutPage";
import ReferenceView from "@/views/ReferenceView";
import GameBoard from "@/views/GameBoard";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name:'Home',
      component: HomePage
    },
    {
      path:'/defaultAuth',
      name:'DefaultPageAuth',
      redirect:{name:'GameBrowser'}
    },
    {
      path: '/login',
      name:'LoginPage',
      component: LoginPage
    },
    {
      path: '/games',
      name:'GameBrowser',
      component: GameBrowser,
      meta:{
        auth:true
      }
    },
    {
      path: '/demo',
      name:'DemoPage',
      component: DemoPage,
      meta:{
        auth:true
      }
    },
    {
      path: '/about',
      name:'AboutPage',
      component: AboutPage
    },
    {
      path: '/reference',
      name:'ReferencePage',
      component: ReferenceView
    },
    {
      path: '/game/:gameId',
      name:'GameBoard',
      component: GameBoard
    }
  ]
})

router.beforeEach(async(to) => {
  if(to.meta.auth && !await store.dispatch('isLoggedIn')){
    store.commit('loginDestination',{path:to.path});
    return {name:'LoginPage'};
  }
})