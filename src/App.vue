<template>
  <GoogleMap @clickedMarker="() => displayLocationModal()" 
    ref="GoogleMap"/>

  <SearchBar ref="SearchBar"/> 

  <DetailsModal v-if="boolDisplayLocationModal" @closeDetailsModal="hideLocationModal"/>

</template>

<script>
import GoogleMap from './components/GoogleMap.vue';
import SearchBar from './components/SearchBar.vue';
import DetailsModal from './components/DetailsModal.vue';
import {store} from '@/store'

export default {
  name: 'App',
  components: {
    GoogleMap,
    SearchBar,
    DetailsModal,
  },
  data() {
    return {
      store,
      boolDisplayLocationModal: false,
    }
  },
  computed: {
    place() {
      return this.store.place;
    }
  },
  watch: {
    place(newPlace) {
      this.goToSearchResult(newPlace);
    }
  },  
  methods: {
    /**
     * Displays the details modal for the given place
     * @param {Object} place - all data about a place 
     */
    displayLocationModal() {
      this.boolDisplayLocationModal = true;
    },
    /**
     * Closes the details modal
     */
    hideLocationModal() {
      this.boolDisplayLocationModal = false;
    },
    /**
     * Calls methods in children components to create a map marker
     * and populate the search input with the result
     * @param {Object} place 
     */
    goToSearchResult(place) {
      this.$refs.GoogleMap.createMarker(place);
      this.$refs.SearchBar.fillInputWithResult(place);
    },
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
