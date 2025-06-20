<template>
  <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10">
    <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
    </h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <input
        v-model="codigo"
        placeholder="Código"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model="descricao"
        placeholder="Descrição"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model.number="valorFornecedor"
        placeholder="Valor Fornecedor"
        type="number"
        step="0.01"
        min="0"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        v-model.number="quantidadeEstoque"
        placeholder="Quantidade Estoque"
        type="number"
        min="0"
        required
        class="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        v-model="tipoProduto"
        required
        class="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option disabled value="">Selecione o tipo</option>
        <option>ELETRONICO</option>
        <option>PERIFERICO</option>
      </select>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white font-semibold p-3 rounded-xl hover:bg-blue-700 transition duration-300"
      >
        {{ isEdit ? 'Salvar Alterações' : 'Cadastrar Produto' }}
      </button>
    </form>
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
