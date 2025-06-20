<template>
  <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Novo Movimento</h2>
    <form @submit.prevent="addMovimento" class="space-y-4">
      <input
        v-model.number="produtoId"
        placeholder="ID do Produto"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="tipoMovimentacao"
        required
        class="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">Tipo de Movimentação</option>
        <option>ENTRADA</option>
        <option>SAIDA</option>
      </select>
      <input
        v-model.number="valorVenda"
        placeholder="Valor de Venda"
        type="number"
        step="0.01"
        min="0"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="dataVenda"
        type="datetime-local"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model.number="quantidadeMovimentada"
        placeholder="Quantidade"
        type="number"
        min="1"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="w-full bg-green-600 text-white font-semibold p-3 rounded-xl hover:bg-green-700 transition duration-300"
      >
        Registrar Movimento
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const produtoId = ref(null)
const tipoMovimentacao = ref('')
const valorVenda = ref(0)
const dataVenda = ref('')
const quantidadeMovimentada = ref(1)

const addMovimento = async () => {
  try {
    await api.post('/movimentos', {
      produtoId: produtoId.value,
      tipoMovimentacao: tipoMovimentacao.value,
      valorVenda: valorVenda.value,
      dataVenda: dataVenda.value,
      quantidadeMovimentada: quantidadeMovimentada.value,
    })
    alert('Movimentação registrada!')
  } catch {
    alert('Erro ao registrar movimentação')
  }
}
</script>
