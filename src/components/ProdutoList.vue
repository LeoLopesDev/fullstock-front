<template>
  <div class="container mt-4">
    <h2 class="mb-4 fw-bold text-secondary">Produtos</h2>
    <div class="row g-4">
      <div
        v-for="produto in produtos"
        :key="produto.id"
        class="col-md-6"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column gap-3">
            <h3 class="card-title fw-semibold text-dark">{{ produto.descricao }}</h3>
            <p class="text-muted mb-1">Código: {{ produto.id }}</p>
            <p class="text-muted mb-1">Tipo: {{ produto.tipoProduto }}</p>
            <p class="text-muted mb-1">Valor Fornecedor: R$ {{ produto.valorFornecedor.toFixed(2) }}</p>
            <p class="text-muted mb-3">Estoque: {{ produto.quantidadeEstoque }}</p>

            <div class="mt-auto d-flex gap-2">
              <router-link
                :to="`/produtos/edit/${produto.id}`"
                class="btn btn-warning flex-grow-1"
              >
                Editar
              </router-link>
              <button
                @click="deleteProduto(produto.id)"
                class="btn btn-danger flex-grow-1"
              >
                Excluir
              </button>
            </div>
          </div>
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
