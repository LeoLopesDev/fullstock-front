<template>
  <div class="container mt-4">
    <h2 class="mb-4 fw-bold text-secondary">Movimentos de Estoque</h2>
    <div class="row g-3">
      <div
        v-for="movimento in movimentos"
        :key="movimento.id"
        class="col-md-6"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column gap-2">
            <h3 class="card-title fw-semibold text-dark">{{ movimento.tipoMovimentacao }}</h3>
            <p class="text-muted mb-1">Produto: {{ movimento.produtoNome }}</p>
            <p class="text-muted mb-1">Quantidade: {{ movimento.quantidadeMovimentada }}</p>
            <p class="text-muted mb-1">Valor Venda: R$ {{ movimento.valorVenda.toFixed(2) }}</p>
            <p class="text-muted mb-0">
              Data: {{ new Date(movimento.dataVenda).toLocaleString() }}
            </p>
          </div>
        </div>
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
