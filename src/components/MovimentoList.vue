<template>
  <div class="container mt-5">
    <h2 class="mb-4 fw-bold text-secondary">Histórico de Movimentações</h2>

    <div class="mb-3">
  <label class="form-label">Filtrar por Tipo de Produto:</label>
  <select v-model="tipoSelecionado" @change="fetchMovimentosPorTipo" class="form-select">
    <option value="">Todos</option>
    <option value="MOVEL">MÓVEL</option>
    <option value="ELETRONICO">ELETRÔNICO</option>
    <option value="ELETRODOMESTICO">ELETRODOMÉSTICO</option>
  </select>
</div>

    <ul class="list-group shadow-sm">
      <li
        v-for="movimento in movimentos"
        :key="movimento.id"
        class="list-group-item d-flex flex-column gap-1"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-1 fw-semibold text-dark">{{ movimento.tipoMovimentacao }}</h5>
          <small class="text-muted">
            {{ new Date(movimento.dataVenda).toLocaleString() }}
          </small>
        </div>

        <p class="mb-0 text-muted">Produto: {{ movimento.produtoDescricao }}</p>
        <p class="mb-0 text-muted">Quantidade: {{ movimento.quantidadeMovimentada }}</p>
        <p class="mb-0 text-muted">Valor Venda: R$ {{ movimento.valorVenda.toFixed(2) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const movimentos = ref([])
const tipoSelecionado = ref('') 

const fetchMovimentos = async () => {
  try {
    const { data } = await api.get('/movimentos')
    movimentos.value = data
  } catch {
    alert('Erro ao carregar movimentos')
  }
}
const fetchMovimentosPorTipo = async () => {
  if (!tipoSelecionado.value) {
    fetchMovimentos()
    return
  }
  try {
    const { data } = await api.get(`/movimentos/tipo/${tipoSelecionado.value}`)
    movimentos.value = data
  } catch {
    alert('Erro ao buscar movimentos por tipo de produto')
  }
}

onMounted(fetchMovimentos)
</script>
