<template>
    <div class="searchResult" @click="clicked">{{placeInfo.name}}</div>
</template>

<script>
    export default {
        name: "SearchResult", 
        props: {
            placeInfo: Object
        },
        methods: {
            clicked() {
                this.$parent.$parent.$emit('clickedSearchResult', this.placeInfo)
            }
        },
        components: {

        }
    }
</script>

<style>
    .searchResult {
        background-color: white;
        padding: 8px;
        border-radius: 2px;
    }

    .searchResult:hover {
        background-color: lightgrey;
    }

    
</style>