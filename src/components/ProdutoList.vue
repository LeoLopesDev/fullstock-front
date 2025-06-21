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

    <div class="table-responsive shadow-sm rounded-3 bg-white p-3">
  <h4 class="fw-bold text-secondary mb-3">Produtos</h4>

  <table class="table table-hover align-middle">
    <thead class="table-light">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Descrição</th>
        <th scope="col">Tipo</th>
        <th scope="col">Valor Fornecedor</th>
        <th scope="col">Estoque</th>
        <th scope="col">Receita</th>
        <th scope="col">Custo</th>
        <th scope="col">Lucro</th>
        <th scope="col">Saídas</th>
        <th scope="col" class="text-center">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="produto in produtos" :key="produto.id">
        <td>{{ produto.id }}</td>
        <td class="fw-semibold">{{ produto.descricao }}</td>
        <td>{{ produto.tipoProduto }}</td>
        <td>R$ {{ produto.valorFornecedor.toFixed(2) }}</td>
        <td>{{ produto.quantidadeEstoque }}</td>
        <td>R$ {{ produto.receita?.toFixed(2) ?? '0.00' }}</td>
        <td>R$ {{ produto.custo?.toFixed(2) ?? '0.00' }}</td>
        <td>R$ {{ produto.lucro?.toFixed(2) ?? '0.00' }}</td>
        <td>{{ produto.quantidadeSaida ?? 0 }}</td>
        <td class="text-center">
          <div class="d-flex justify-content-center gap-2">
            <router-link
              :to="`/produtos/edit/${produto.id}`"
              class="btn btn-sm btn-warning"
              title="Editar"
            >
              <i class="bi bi-pencil-square"></i>
            </router-link>
            <button
              @click="deleteProduto(produto.id)"
              class="btn btn-sm btn-danger"
              title="Excluir"
            >
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
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
