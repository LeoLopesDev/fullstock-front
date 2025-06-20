<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Novo Movimento</h2>
        <form @submit.prevent="addMovimento">
          <div class="mb-3">
            <input
              v-model.number="produtoId"
              type="number"
              placeholder="ID do Produto"
              required
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <select
              v-model="tipoMovimentacao"
              required
              class="form-select"
            >
              <option disabled value="">Tipo de Movimentação</option>
              <option>ENTRADA</option>
              <option>SAIDA</option>
            </select>
          </div>

          <div class="mb-3">
            <input
              v-model.number="valorVenda"
              type="number"
              step="0.01"
              min="0"
              placeholder="Valor de Venda"
              required
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <input
              v-model="dataVenda"
              type="datetime-local"
              required
              class="form-control"
            />
          </div>

          <div class="mb-3">
            <input
              v-model.number="quantidadeMovimentada"
              type="number"
              min="1"
              placeholder="Quantidade"
              required
              class="form-control"
            />
          </div>

          <button
            type="submit"
            class="btn btn-success w-100"
          >
            Registrar Movimento
          </button>
        </form>
      </div>
    </div>
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
