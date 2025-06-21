<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-body">
        <form
          @submit.prevent="addMovimento"
          class="p-4 rounded-3 shadow bg-white"
        >
          <h3 class="mb-4 fw-bold text-secondary">Registrar Movimentação</h3>

          <div class="form-floating mb-3">
            <input
              v-model.number="produtoId"
              type="number"
              class="form-control rounded-3"
              id="produtoId"
              placeholder="ID do Produto"
              required
            />
            <label for="produtoId">ID do Produto</label>
          </div>

          <div class="form-floating mb-3">
            <select
              v-model="tipoMovimentacao"
              class="form-select rounded-3"
              id="tipoMovimentacao"
              required
            >
              <option disabled value="">Selecione</option>
              <option>ENTRADA</option>
              <option>SAIDA</option>
            </select>
            <label for="tipoMovimentacao">Tipo de Movimentação</label>
          </div>

          <div class="form-floating mb-3">
            <input
              v-model.number="valorVenda"
              type="number"
              step="0.01"
              min="0"
              class="form-control rounded-3"
              id="valorVenda"
              placeholder="Valor de Venda"
              required
            />
            <label for="valorVenda">Valor de Venda (R$)</label>
          </div>

          <div class="form-floating mb-3">
            <input
              v-model="dataVenda"
              type="datetime-local"
              class="form-control rounded-3"
              id="dataVenda"
              placeholder="Data da Venda"
              required
            />
            <label for="dataVenda">Data da Venda</label>
          </div>

          <div class="form-floating mb-4">
            <input
              v-model.number="quantidadeMovimentada"
              type="number"
              min="1"
              class="form-control rounded-3"
              id="quantidadeMovimentada"
              placeholder="Quantidade"
              required
            />
            <label for="quantidadeMovimentada">Quantidade</label>
          </div>

          <button
            type="submit"
            class="btn btn-success w-100 py-3 rounded-3 fw-semibold"
          >
            Registrar Movimento
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const produtoId = ref(null);
const tipoMovimentacao = ref("");
const valorVenda = ref(0);
const dataVenda = ref("");
const quantidadeMovimentada = ref(1);

const addMovimento = async () => {
  try {
    await api.post("/movimentos", {
      produtoId: produtoId.value,
      tipoMovimentacao: tipoMovimentacao.value,
      valorVenda: valorVenda.value,
      dataVenda: dataVenda.value,
      quantidadeMovimentada: quantidadeMovimentada.value,
    });
    alert("Movimentação registrada!");
  } catch {
    alert("Erro ao registrar movimentação");
  }
};
</script>
