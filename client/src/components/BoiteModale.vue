<template>
    <dialog :class="{ 'afficher modale': isOpen }">
        <div class="modale-contenu">
            <h3 v-show="message">{{ message }}</h3>
            <form @submit.prevent="ajouterProduit">
                <h3>Ajouter un produit</h3>
                <div>
                    <label>Nom</label>
                    <input v-model="nom" type="text" placeholder="Nom de l'article"/>
                </div>
                <div>
                    <label>Categorie</label>
                    <input v-model="categorie" type="text" placeholder="Catégorie de l'article"/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea v-model="description" rows="8" cols="30" placeholder="Description de l'article"></textarea>
                </div>
                <div>
                    <label>Prix</label>
                    <input v-model="prix" type="number" step="0.01"/>
                </div>
                <div>
                    <label>Photo</label>
                    <input v-model="photo" type="text" placeholder="demo.avif">
                </div>
                <input type="submit" value="Enregister"/>
            </form>
            <button @click="fermerModal">Annuler</button>
        </div>
    </dialog>
</template>

<script>

export default {
  props: ['isOpen'],
  data () {
    return {
      nom: null,
      categorie: null,
      description: null,
      prix: null,
      photo: null,
      message: null
    }
  },
  methods: {
    ajouterProduit () {
      console.log('test1')
      if (this.nom && this.categorie && this.description && this.prix && this.photo) {
        this.$emit('onInsert', {
          nom: this.nom,
          categorie: this.categorie,
          description: this.description,
          prix: this.prix,
          photo: this.photo
        })
        this.message = null
        this.nom = null
        this.categorie = null
        this.description = null
        this.prix = null
        this.photo = null
        this.fermerModal()
      } else {
        this.message = 'Veuillez remplir tout les champs.'
      }
    },
    fermerModal () {
      if (this.message) {
        this.message = null
      }
      this.$emit('onClose')
    }
  }
}
</script>
