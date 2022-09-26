<!-- The SearchResult component displays a place's name and coordinates.
It appears as an item in the ResultsList. -->
<template>
    <div class="clearfix" id="searchResult" @click="clicked">
        <div class="inline" id="modalHeadText">
            <img class="inline clearfix" id="pinResult" src="../../public/images/icon-pin.svg"/>
            <div class="inline" style="padding-left: 0;">
                <div id="detailsTitle" style="font-size: .75em;">{{this.place.name}}</div>
                <div id="detailsCoords">{{this.place.location.lat}}, {{this.place.location.lon}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SearchResult", 
        props: {
            place: Object
        },
        methods: {
            /**
             * Tells the SearchBar parent to emit an event when this SearchResult is clicked.
             */
            clicked() {
                this.$parent.$parent.$parent.$emit('clickedSearchResult', this.place)
            },
        },
    }
</script>

<style>
    #searchResult {
        background-color: white;
    }

    #searchResult:hover {
        background-color: rgb(245, 245, 245);
    }

    #pinResult {
        height: 45px;
        width: 45px;
    }

    #detailsTitle {
        font-size: .75em;
    }
</style>