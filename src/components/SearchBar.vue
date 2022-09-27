<template>
    <div class="overlay rounded shadow-lg" id="searchBar">
        
        <form @submit.prevent="onSubmit" class="d-flex" role="search" id="searchForm">

            <input v-model="store.searchQuery" id="searchInput" @keyup.enter="onSubmit"
            class="form-control shadow-none" type="search" placeholder="Search..." aria-label="Search"
            name="field" autocomplete="off" ref="SearchBarInput"/>
        </form>

        <ResultsDisplay v-show="store.searchQuery !== ''"
            ref="ResultsDisplay"/>

    </div>
</template>

<script>
import ResultsDisplay from "./ResultsDisplay.vue";
import {store} from '@/store.js';

    export default {
    name: "SearchBar",
    data() {
        return {
            store
        };
    },
    emits: ['clickedSearchResult'],
    methods: {
        /**
         * Handles hitting the 'enter' key while searching
         * by going to the matching result if one exists
         */
        onSubmit() {
            const filteredResults = this.$refs.ResultsDisplay.filteredResults;
            for (const result of filteredResults) {
                if (result.name.toLowerCase() == this.store.searchQuery.toLowerCase().trim()) {
                    this.$parent.goToSearchResult(result);
                }
            }
        },
        /**
         * populates the search input with the full name of the place.
         * @param {Object} place 
         */
        fillInputWithResult(place) {
            this.store.searchQuery = place.name
        },
        /**
         * Reveals the details modal for the given place
         * @param {Object} place 
         */
        displayResultsDisplay(place) {
            this.fillInputWithResult(place);
            this.store.place = place;
        },
    },
    components: { ResultsDisplay, },
    /**
     * Starts the page with the search input focused.
     */
    mounted() {
        this.$refs.SearchBarInput.focus();
    },

}
</script>

<style>
    .overlay {
        position: absolute;
        z-index: 100;
    }

    .form-control {
        border-radius: 2px;
    }

    #searchBar {
        top: 8px;
        left: 8px;
        width: 25%;
        max-width: 400px;
        min-width: 200px;
    }

</style>