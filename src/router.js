// previously was
// import Router from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from "@/components/HelloWorld";

export const router = createRouter({
  history: createWebHistory(),
  routes:[
    {path:'/',component:HelloWorld}
  ]
})