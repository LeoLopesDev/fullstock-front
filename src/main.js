import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.min.css'

import ProdutoList from './components/ProdutoList.vue'
import ProdutoForm from './components/ProdutoForm.vue'
import MovimentoList from './components/MovimentoList.vue'
import MovimentoForm from './components/MovimentoForm.vue'

const routes = [
  { path: '/', component: ProdutoList },
  { path: '/produtos/new', component: ProdutoForm },
  { path: '/produtos/edit/:id', component: ProdutoForm, props: true },
  { path: '/movimentos', component: MovimentoList },
  { path: '/movimentos/new', component: MovimentoForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
