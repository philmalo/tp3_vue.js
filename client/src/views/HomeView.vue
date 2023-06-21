<template>
  <div v-show="message">
      <div class="message">
        <strong>{{ message }}</strong>
        <button type="button" @click="retirer">X</button>
      </div>
  </div>
  <boite-modale :isOpen="modalOuverte" @onClose="fermerModal" @onInsert="insererProduit"></boite-modale>
  <button @click="ouvrirModal">Ajouter un produit</button>
  <div class="produits">
    <div v-for="(produit, i) in inventaire" :key="i" :class="produit.estModifie ? 'modifProduit' : ''">
      <div v-if="produit.estModifie">
        <h4 v-show="modifMessage">{{ modifMessage }}</h4>
        <input v-model="produit.nom" />
        <input v-model="produit.categorie" />
        <textarea v-model="produit.description"></textarea>
        <input v-model="produit.prix" />
        <input v-model="produit.photo">
        <button @click="actionEnregistrer(produit)">Enregistrer</button>
        <button @click="actionAnnuler">Annuler</button>
      </div>
      <div v-else :class="produit.estModifie ? '' : 'produit'">
        <div class="boutonModif">
          <button @click="actionModif(produit)">Modifier</button>
          <button @click="deleteProduit(produit.id)">Supprimer</button>
        </div>
        <h3>{{ produit.nom }}</h3>
        <small>{{ produit.categorie }}</small>
        <p>{{ produit.description }}</p>
        <strong>{{ produit.prix }}$</strong>
        <img :src="require(`@/assets/img/${produit.photo}`)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import ProductDataService from '@/services/ProductDataService'
import BoiteModale from '../components/BoiteModale.vue'
export default {
  props: ['inventaire', 'add', 'addInv', 'remInv'],
  components: {
    BoiteModale
  },
  data () {
    return {
      modalOuverte: false,
      estModifie: false,
      submitted: false,
      message: null,
      modifMessage: null,
      produitEnCoursModif: null
    }
  },
  methods: {
    ouvrirModal () {
      this.modalOuverte = true
    },
    fermerModal () {
      this.modalOuverte = false
    },
    insererProduit (donnees) {
      console.log('test2')
      ProductDataService.create(donnees).then(response => {
        donnees.id = response.data.id
        this.addInv(donnees)
        this.submitted = true
        this.message = 'Produit ajouté!'
      }).catch(erreur => {
        this.message = erreur.response.data.message
      })
    },
    deleteProduit (id) {
      ProductDataService.delete(id).then(response => {
        this.submitted = true
        this.message = 'Produit retiré.'
        this.remInv(this.produitIndex)
      }).catch(erreur => {
        this.message = erreur.response.data.message
      })
    },
    actionModif (produit) {
      this.inventaire.forEach((prod) => {
        prod.estModifie = false
      })
      produit.original = {
        nom: produit.nom,
        categorie: produit.categorie,
        description: produit.description,
        prix: produit.prix,
        photo: produit.photo
      }
      produit.estModifie = true
      this.produitEnCoursModif = produit
    },
    actionEnregistrer (produit) {
      if (produit.nom && produit.categorie && produit.description && produit.prix && produit.photo) {
        ProductDataService.update(produit.id, produit).then(response => {
          this.message = response.data.message
        })
        this.modifMessage = null
        produit.estModifie = false
      } else {
        this.modifMessage = 'Les champs ne peuvent pas être vide.'
      }
    },
    actionAnnuler () {
      if (this.produitEnCoursModif) {
        this.produitEnCoursModif.estModifie = false
        this.produitEnCoursModif.nom = this.produitEnCoursModif.original.nom
        this.produitEnCoursModif.categorie = this.produitEnCoursModif.original.categorie
        this.produitEnCoursModif.description = this.produitEnCoursModif.original.description
        this.produitEnCoursModif.prix = this.produitEnCoursModif.original.prix
        this.produitEnCoursModif.photo = this.produitEnCoursModif.original.photo
        this.produitEnCoursModif = null
      }
    },
    retirer () {
      this.submitted = false
      this.message = null
      this.modifMessage = null
    }
  },
  computed: {
    produitIndex () {
      const index = this.inventaire.findIndex((produit) => {
        return produit.id === this.id
      })
      return index
    }
  }
}
</script>
