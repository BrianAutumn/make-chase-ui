import {createApp} from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import {loadFonts} from '@/plugins/webfontloader'
import {store} from "@/store";
import {router} from "@/router";
import {apolloProvider} from "@/apollo";

loadFonts()

createApp(App)
  .use(vuetify)
  .use(store)
  .use(router)
  .use(apolloProvider)
  .mount('#app')
