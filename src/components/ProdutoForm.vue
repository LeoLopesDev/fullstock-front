<template>
  <div class="container mt-5" style="max-width: 600px;">
    <div class="card shadow-lg rounded-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-4 fw-bold text-secondary">
          {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
        </h2>
        <form @submit.prevent="submitForm" class="d-flex flex-column gap-3">
          <input
            v-model="codigo"
            type="text"
            placeholder="Código"
            required
            class="form-control"
          />
          <input
            v-model="descricao"
            type="text"
            placeholder="Descrição"
            required
            class="form-control"
          />
          <input
            v-model.number="valorFornecedor"
            type="number"
            step="0.01"
            min="0"
            placeholder="Valor Fornecedor"
            required
            class="form-control"
          />
          <input
            v-model.number="quantidadeEstoque"
            type="number"
            min="0"
            placeholder="Quantidade Estoque"
            required
            class="form-control"
          />
          <select
            v-model="tipoProduto"
            required
            class="form-select"
          >
            <option disabled value="">Selecione o tipo</option>
            <option>ELETRONICO</option>
            <option>ELETRODOMESTICO</option>
            <option>MOVEL</option>
          </select>
          <button
            type="submit"
            class="btn btn-primary fw-semibold"
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
