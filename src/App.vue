<template>
  <GoogleMap @clickedMarker="(place) => displayLocationModal(place)" 
    ref="GoogleMap"/>

  <SearchBar ref="SearchBar"/> 

  <DetailsModal v-if="boolDisplayLocationModal" @closeDetailsModal="hideLocationModal"/>

</template>

<script>
import GoogleMap from './components/GoogleMap.vue';
import SearchBar from './components/SearchBar.vue';
import DetailsModal from './components/DetailsModal.vue';

export default {
  name: 'App',
  components: {
    GoogleMap,
    SearchBar,
    DetailsModal,
  },
  data() {
    return {
      boolDisplayLocationModal: false,
      place: null,
    }
  },
  provide() {
    return {
      goToSearchResult: this.goToSearchResult
    }
  },
  methods: {
    /**
     * Displays the details modal for the given place
     * @param {Object} place - all data about a place 
     */
    displayLocationModal(place) {
      this.place = place;
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
      this.$refs.SearchBar.displayResultsDisplay(place);
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
