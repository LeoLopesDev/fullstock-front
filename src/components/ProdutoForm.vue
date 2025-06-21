<template>
  <div class="container mt-5" style="max-width: 600px;">
    <div class="card shadow-lg rounded-4">
      <div class="card-body">
        <form @submit.prevent="submitForm" class="p-4 rounded-3 shadow bg-white">
  <h3 class="mb-4 fw-bold text-secondary">
    {{ isEdit ? 'Editar Produto' : 'Cadastrar Produto' }}
  </h3>

  <div class="form-floating mb-3">
    <input
      v-model="descricao"
      type="text"
      class="form-control rounded-3"
      id="descricao"
      placeholder="Descrição"
      required
    />
    <label for="descricao">Descrição</label>
  </div>

  <div class="form-floating mb-3">
    <input
      v-model.number="valorFornecedor"
      type="number"
      step="0.01"
      min="0"
      class="form-control rounded-3"
      id="valorFornecedor"
      placeholder="Valor Fornecedor"
      required
    />
    <label for="valorFornecedor">Valor Fornecedor (R$)</label>
  </div>

  <div class="form-floating mb-3">
    <input
      v-model.number="quantidadeEstoque"
      type="number"
      min="0"
      class="form-control rounded-3"
      id="quantidadeEstoque"
      placeholder="Quantidade Estoque"
      required
    />
    <label for="quantidadeEstoque">Quantidade em Estoque</label>
  </div>

  <div class="form-floating mb-4">
    <select
      v-model="tipoProduto"
      class="form-select rounded-3"
      id="tipoProduto"
      required
    >
      <option disabled value="">Selecione o tipo</option>
      <option>ELETRONICO</option>
      <option>ELETRODOMESTICO</option>
      <option>MOVEL</option>
    </select>
    <label for="tipoProduto">Tipo de Produto</label>
  </div>

  <button
    type="submit"
    class="btn btn-primary w-100 py-3 rounded-3 fw-semibold"
  >
    {{ isEdit ? 'Salvar Alterações' : 'Cadastrar Produto' }}
  </button>
</form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const isEdit = ref(false)

const codigo = ref('')
const descricao = ref('')
const valorFornecedor = ref(0)
const quantidadeEstoque = ref(0)
const tipoProduto = ref('')

const loadProduto = async (id) => {
  try {
    const { data } = await api.get(`/produtos/${id}`)
    codigo.value = data.codigo
    descricao.value = data.descricao
    valorFornecedor.value = data.valorFornecedor
    quantidadeEstoque.value = data.quantidadeEstoque
    tipoProduto.value = data.tipoProduto
  } catch {
    alert('Erro ao carregar produto')
  }
}

onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    loadProduto(route.params.id)
  }
})

const submitForm = async () => {
  const payload = {
    codigo: codigo.value,
    descricao: descricao.value,
    valorFornecedor: valorFornecedor.value,
    quantidadeEstoque: quantidadeEstoque.value,
    tipoProduto: tipoProduto.value,
  }
  try {
    if (isEdit.value) {
      await api.put(`/produtos/${route.params.id}`, payload)
      alert('Produto atualizado')
    } else {
      await api.post('/produtos', payload)
      alert('Produto cadastrado')
    }
    router.push('/')
  } catch {
    alert('Erro ao salvar produto')
  }
}
</script>
