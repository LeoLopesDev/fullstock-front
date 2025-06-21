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

    <div class="table-responsive shadow-sm rounded-3 bg-white p-3">
  <h4 class="fw-bold text-secondary mb-3">Movimentações</h4>

  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th>Tipo</th>
        <th>Data</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Valor de Venda</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movimento in movimentos" :key="movimento.id">
        <td class="fw-semibold">{{ movimento.tipoMovimentacao }}</td>
        <td>{{ new Date(movimento.dataVenda).toLocaleString() }}</td>
        <td>{{ movimento.produtoDescricao }}</td>
        <td>{{ movimento.quantidadeMovimentada }}</td>
        <td>R$ {{ movimento.valorVenda.toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</div>

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
