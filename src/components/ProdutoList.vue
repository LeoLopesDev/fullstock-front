<template>
  <div class="max-w-5xl mx-auto mt-8">
    <h2 class="text-3xl font-bold mb-6 text-gray-800">Produtos</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div v-for="produto in produtos" :key="produto.id"
        class="bg-white rounded-xl shadow p-5 flex flex-col gap-2 hover:shadow-lg transition">
        <h3 class="text-xl font-semibold text-gray-800">{{ produto.descricao }}</h3>
        <p class="text-gray-600">Código: {{ produto.codigo }}</p>
        <p class="text-gray-600">Tipo: {{ produto.tipoProduto }}</p>
        <p class="text-gray-600">Valor Fornecedor: R$ {{ produto.valorFornecedor.toFixed(2) }}</p>
        <p class="text-gray-600">Estoque: {{ produto.quantidadeEstoque }}</p>
        <div class="mt-3 flex gap-3">
          <router-link
            :to="`/produtos/edit/${produto.id}`"
            class="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 transition text-white">
            Editar
          </router-link>
          <button @click="deleteProduto(produto.id)"
            class="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition text-white">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const produtos = ref([])

const fetchProdutos = async () => {
  try {
    const { data } = await api.get('/produtos')
    produtos.value = data
  } catch (error) {
    alert('Erro ao carregar produtos')
  }
}

const deleteProduto = async (id) => {
  if (!confirm('Confirma exclusão do produto?')) return
  try {
    await api.delete(`/produtos/${id}`)
    produtos.value = produtos.value.filter(p => p.id !== id)
    alert('Produto excluído')
  } catch (error) {
    alert('Erro ao excluir produto')
  }
}

onMounted(fetchProdutos)
</script>
