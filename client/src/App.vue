<template>
  <header className="header">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À propos</router-link>
    </nav>
      <picture><img :src="require(`@/assets/img/logo.jpeg`)" alt="logo du site"></picture>
  </header>
  <div class="App">
    <router-view
    :inventaire="inventaire"
    :addInv="addInventaire"
    :remInv="removeInventaire"/>
  </div>
  <footer>
    <div>
        <p>tous droits réservés</p>
    </div>
  </footer>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'
export default {
  data () {
    return {
      inventaire: []
    }
  },
  methods: {
    addInventaire (donnees) {
      this.inventaire.push(donnees)
    },
    removeInventaire (index) {
      this.inventaire.splice(index, 1)
    }
  },
  mounted () {
    ProductDataService.getAll().then(response => {
      this.inventaire = response.data
    })
  }
}
</script>
