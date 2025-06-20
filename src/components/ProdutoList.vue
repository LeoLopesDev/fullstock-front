<template>
  <div class="container mt-5">
    <h2 class="mb-4 fw-bold text-secondary">Produtos</h2>

    <ul class="list-group shadow-sm">
      <li
        v-for="produto in produtos"
        :key="produto.id"
        class="list-group-item d-flex flex-column gap-2"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-semibold text-dark">{{ produto.descricao }}</h5>
          <small class="text-muted">#{{ produto.id }}</small>
        </div>

        <div class="text-muted">Tipo: {{ produto.tipoProduto }}</div>
        <div class="text-muted">Valor Fornecedor: R$ {{ produto.valorFornecedor.toFixed(2) }}</div>
        <div class="text-muted">Estoque: {{ produto.quantidadeEstoque }}</div>

        <div class="d-flex gap-2 mt-3">
          <router-link
            :to="`/produtos/edit/${produto.id}`"
            class="btn btn-sm btn-warning flex-grow-1"
          >
            Editar
          </router-link>
          <button
            @click="deleteProduto(produto.id)"
            class="btn btn-sm btn-danger flex-grow-1"
          >
            Excluir
          </button>
        </div>
      </li>
    </ul>
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
