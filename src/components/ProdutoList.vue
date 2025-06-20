<template>
  <div class="container mt-5">
    <h2 class="mb-4 fw-bold text-secondary">Produtos</h2>

    <div class="mb-4">
      <label class="form-label fw-semibold">Filtrar por Tipo:</label>
      <select v-model="tipoSelecionado" @change="fetchProdutosEbalancos" class="form-select">
        <option value="">Todos</option>
        <option value="MOVEL">MÓVEL</option>
        <option value="ELETRONICO">ELETRÔNICO</option>
        <option value="ELETRODOMESTICO">ELETRODOMÉSTICO</option>
      </select>
    </div>

    <ul class="list-group shadow-sm">
      <li
        v-for="produto in produtos"
        :key="produto.id"
        class="list-group-item d-flex flex-column gap-2"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-0 fw-semibold text-dark">{{ produto.descricao }}</h5>
          <small class="text-muted">CÓDIGO DO PRODUTO : {{ produto.id }}</small>
        </div>

        <div class="text-muted">Tipo: {{ produto.tipoProduto }}</div>
        <div class="text-muted">Valor Fornecedor: R$ {{ produto.valorFornecedor.toFixed(2) }}</div>
        <div class="text-muted">Estoque: {{ produto.quantidadeEstoque }}</div>

        <div class="text-muted">Receita: R$ {{ produto.receita?.toFixed(2) ?? '0.00' }}</div>
        <div class="text-muted">Custo: R$ {{ produto.custo?.toFixed(2) ?? '0.00' }}</div>
        <div class="text-muted">Lucro: R$ {{ produto.lucro?.toFixed(2) ?? '0.00' }}</div>
        <div class="text-muted">Quantidade Saída: {{ produto.quantidadeSaida ?? 0 }}</div>

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
const balancos = ref([])
const tipoSelecionado = ref("")

// Busca produtos, filtrando por tipo se especificado
const fetchProdutos = async () => {
  try {
    if (tipoSelecionado.value === "") {
      const { data } = await api.get('/produtos')
      produtos.value = data
    } else {
      const { data } = await api.get(`/produtos/tipo/${tipoSelecionado.value}`)
      produtos.value = data
    }
  } catch (error) {
    alert('Erro ao carregar produtos')
  }
}

// Busca balanço financeiro para todos produtos
const fetchBalancos = async () => {
  try {
    const { data } = await api.get('/movimentos/balanco')
    balancos.value = data
  } catch (error) {
    alert('Erro ao carregar balanço financeiro')
  }
}

// Carrega produtos e balanços, depois mescla os dados
const fetchProdutosEbalancos = async () => {
  await fetchProdutos()
  await fetchBalancos()

  // Mesclar balanço financeiro em cada produto
  produtos.value = produtos.value.map(produto => {
    const balanco = balancos.value.find(b => b.produtoId === produto.id)
    return {
      ...produto,
      receita: balanco?.receita ?? 0,
      custo: balanco?.custo ?? 0,
      lucro: balanco?.lucro ?? 0,
      quantidadeSaida: balanco?.quantidadeSaida ?? 0
    }
  })
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

onMounted(fetchProdutosEbalancos)
</script>
