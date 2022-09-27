<!-- The ResultsList component is a list of SearchResults that auto-fills based on the search query -->
<template>
    <div class="autoCompleteList">
        <ul class="list-group" v-if="filteredResults.length !== 0">
            <li class="list-group-item" v-for="result in filteredResults" :key="result.name" >
                <SearchResult :place="result"/>
            </li>
        </ul>
    </div>
</template>

<script>
import * as sampleData from '../../public/sample-data'
import SearchResult from './SearchResult.vue';
import {store} from '@/store.js'

export default {
    data() {
        return {
            store,
            autoCompleteList: sampleData.sampleData
        };
    },
    computed: { 
        /**
         * filters the search results based on the search query.
         * A result is shown if it contains the entire search query as a substring.
         */
        filteredResults() {
            return this.store.searchQuery == "" 
                ? this.autoCompleteList
                : this.autoCompleteList.filter((result) => 
                result.name.toLowerCase().includes(this.store.searchQuery.toLowerCase()))
        }
    },
    emits: ['update:filteredResults'],
    watch: {
        filteredResults() {
            this.$emit("update:filteredResults", this.filteredResults);
        }
    },
    components: { SearchResult }
}

</script>

<style>
    .list-group {
        overflow-y: auto;
        max-height: 205px;
    }

    .list-group-item {
        padding: 0;
        border-radius: 2px;
        text-align: left;
    }

</style>