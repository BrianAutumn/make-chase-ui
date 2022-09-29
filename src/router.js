import {createRouter, createWebHistory} from 'vue-router'
import LoginPage from "@/views/LoginPage";
import GameBrowser from "@/views/GameBrowser";
import HomePage from "@/views/HomePage";
import {store} from "@/store";
import GameManager from "@/views/GameManager";
import PrivacyNotice from "@/views/PrivacyNotice";
import TermsNotice from "@/views/TermsNotice";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/defaultAuth',
      name: 'DefaultPageAuth',
      redirect: {name: 'GameBrowser'}
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/games',
      name: 'GameBrowser',
      component: GameBrowser,
      meta: {
        auth: true
      }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: PrivacyNotice
    },
    {
      path: '/tos',
      name: 'Terms',
      component: TermsNotice
    },
    {
      path: '/game/:gameId',
      name: 'GameManager',
      component: GameManager
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.meta.auth && !await store.dispatch('isLoggedIn')) {
    store.commit('loginDestination', {path: to.path});
    return {name: 'LoginPage'};
  }
})