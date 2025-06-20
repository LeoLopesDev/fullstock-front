<template>
  <div class="max-w-5xl mx-auto mt-8">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Movimentos de Estoque</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="movimento in movimentos"
        :key="movimento.id"
        class="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-gray-800">{{ movimento.tipoMovimentacao }}</h3>
        <p class="text-gray-600">Produto: {{ movimento.produtoNome }}</p>
        <p class="text-gray-600">Quantidade: {{ movimento.quantidadeMovimentada }}</p>
        <p class="text-gray-600">Valor Venda: R$ {{ movimento.valorVenda.toFixed(2) }}</p>
        <p class="text-gray-600">Data: {{ new Date(movimento.dataVenda).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const movimentos = ref([])

const fetchMovimentos = async () => {
  try {
    const { data } = await api.get('/movimentos')
    movimentos.value = data
  } catch {
    alert('Erro ao carregar movimentos')
  }
}

onMounted(fetchMovimentos)
</script>
