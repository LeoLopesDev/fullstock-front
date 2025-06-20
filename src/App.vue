<template>
  <div>
    <nav class="bg-gray-900 text-white p-4 shadow flex items-center justify-between">
      <div class="text-2xl font-bold">FullStock</div>
      <div class="flex gap-6">
        <router-link to="/" class="hover:text-blue-400 transition">Produtos</router-link>
        <router-link to="/produtos/new" class="hover:text-blue-400 transition">Novo Produto</router-link>
        <router-link to="/movimentos" class="hover:text-blue-400 transition">Movimentos</router-link>
        <router-link to="/movimentos/new" class="hover:text-blue-400 transition">Novo Movimento</router-link>
      </div>
    </nav>

    <main class="p-6 bg-gray-100 min-h-screen">
      <router-view />
    </main>
  </div>
</template>
