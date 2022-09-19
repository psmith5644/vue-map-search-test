<template>
    <div class="overlay" id="resultFoundBar">
        <div id="resultHead" class="shadow">
            Found x Results:
        </div>
        <div id="resultBody" class="clearfix shadow">
            <img class="inline" id="pin" src="../../public/images/map-marker-2-xxl.png" style="height: 35px; width: 35px;"/>
            <SearchResult class="inline" id="foundSearchResult" :placeInfo="placeInfo"/>
            <div id="detailsCoords">{{this.placeInfo.location.lat}}, {{this.placeInfo.location.lon}}</div>
        </div>
            
    </div>
</template>

<script>
    import SearchResult from './SearchResult.vue';

    export default {
        components: {
            SearchResult,
        },
        props: {
            placeInfo: null
        }
    }
</script>

<style>
    #resultFoundBar {
        margin-top: 8px;
        width: 100%;
    }

    #resultHead {
        background-color: rgb(0, 98, 255);
        color: white;
        border-radius: 3px;
        text-align: left;
        padding: 8px;
        font-size: .75em;
    }

    #foundSearchResult {
        padding-left: 0;
        padding-bottom: 0;
    }

    #foundSearchResult:hover {
        background-color: white;
    }

    #resultBody {
        background-color: white;
        border-radius: 3px;
    }

    #detailsCoords {
        padding-left: 0;
        margin-left: 0;
    }

    .shadow {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

</style>