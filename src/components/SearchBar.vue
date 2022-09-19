<template>
    <div class="overlay rounded shadow" id="searchBar">
        <form @submit.prevent="onSubmit" class="d-flex" role="search">
            <input v-model="searchQuery" @focus="showResults" id="searchInput"
                class="form-control shadow-none" type="search" placeholder="Search..." aria-label="Search">
        </form>
        <div>
            <AutoCompleteList v-if="searchQuery !== '' && boolShowList" :searchQuery="searchQuery"></AutoCompleteList>
        </div>
            
        <ResultFoundBar v-if="boolShowResultFoundBar" :placeInfo="this.placeInfo"/>

    </div>
</template>

<script>
import AutoCompleteList from "./AutoCompleteList.vue";
import ResultFoundBar from "./ResultFoundBar.vue";

    export default {
    name: "SearchBar",
    data() {
        return {
            searchQuery: "",
            boolShowList: true,
            boolShowResultFoundBar: false,
            placeInfo: null
        };
    },
    emits: ['clickedSearchResult'],
    methods: {
        onSubmit() {
            // TODO: Show results
        },
        hideResults() {
            console.log("hiding search results");
            this.boolShowList = false;
        },
        fillInputWithResult(placeInfo) {
            console.log("filling the input with the result");
            this.searchQuery = placeInfo.name
        },
        displayResultFoundBar(placeInfo) {
            this.hideResults();
            this.fillInputWithResult(placeInfo);
            this.boolShowResultFoundBar = true;
            this.placeInfo = placeInfo;
        },
        showResults() {
            console.log("showing search results and hiding result bar");
            this.boolShowList = true;
            this.boolShowResultFoundBar = false;
        }

    },
    components: { AutoCompleteList, ResultFoundBar, },
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
    }
</style>