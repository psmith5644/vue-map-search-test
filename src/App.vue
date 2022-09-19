<template>
  <GoogleMap @clickedMarker="(placeInfo) => displayLocationModal(placeInfo)" 
    ref="GoogleMap" />

  <SearchBar @clickedSearchResult="(placeInfo) => goToSearchResult(placeInfo)" 
    ref="SearchBar"/> 

  <DetailsModal :placeInfo="this.placeInfo" 
    v-if="boolDisplayLocationModal" @closeDetailsModal="hideLocationModal"/>
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
      placeInfo: null,
      boolShowResultsFoundBar: false   
    }
  },
  methods: {
    displayLocationModal(placeInfo) {
      console.log("displaying the place modal");
      this.placeInfo = placeInfo;
      this.boolDisplayLocationModal = true;
      this.$refs.GoogleMap
    },
    hideLocationModal() {
      console.log("hiding place modal");
      this.boolDisplayLocationModal = false;
    },
    goToSearchResult(placeInfo) {
      this.$refs.GoogleMap.createMarker(placeInfo);
      this.$refs.SearchBar.displayResultFoundBar(placeInfo);
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
