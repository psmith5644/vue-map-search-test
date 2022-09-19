<template>
    <div class="autoCompleteList">
        <ul class="list-group" v-if="filteredItems.length !== 0">
            <li class="list-group-item" v-for="autoCompleteItem in filteredItems" :key="autoCompleteItem.name" >
                <SearchResult :placeInfo="autoCompleteItem"/>
            </li>
        </ul>
        <ul class="list-group" v-else>
            <li class="list-group-item" id="noResults">No Results</li>
        </ul>
    </div>
</template>

<script>
import * as sampleData from '../../public/sample-data'
import SearchResult from './SearchResult.vue';

export default {
    data() {
        return {
            autoCompleteList: sampleData.sampleData
        };
    },
    props: {
       searchQuery: String 
    },
    computed: { 
        filteredItems() {
                return this.searchQuery == "" 
                ? this.autoCompleteList
                : this.autoCompleteList.filter((item) => 
                item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            
        }
    },
    components: { SearchResult }
}

</script>

<style>
    .autoCompleteList {
        color: blue
    }

    .list-group {
        overflow-y: auto;
        max-height: 205px;
    }

    .list-group-item {
        padding: 0;
        border-radius: 2px;
        text-align: left;
    }

    #noResults {
        padding: 8px;
    }

</style>