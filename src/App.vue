<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-4">
      <div class="container-fluid">
        <div class="navbar-brand fw-bold fs-4">FullStock</div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto gap-3">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active" exact>Produtos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/produtos/new" class="nav-link" active-class="active">Cadastrar Produto</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/movimentos" class="nav-link" active-class="active">Fluxo de Estoque</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/movimentos/new" class="nav-link" active-class="active">Gerenciar Estoque</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="p-4 bg-light min-vh-100">
      <router-view />
    </main>
  </div>
</template>
