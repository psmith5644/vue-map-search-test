<!-- The SearchResult component displays a place's name and coordinates.
It appears as an item in the ResultsList. -->
<template>
    <div class="clearfix" id="searchResult" @click="clicked">
        <div class="inline" id="modalHeadText">
            <img class="inline clearfix" id="pinResult" src="../../public/images/icon-pin.svg"/>
            <div class="inline" style="padding-left: 0;">
                <div id="detailsTitle" style="font-size: .75em;">{{place.name}}</div>
                <div id="detailsCoords">{{place.location.lat}}, {{place.location.lon}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {store} from '@/store.js'

    export default {
        name: "SearchResult", 
        data() {
            return {
                store,
            }
        },
        props: {
            place: {}
        },
        methods: {
            /**
             * Updates the current place, which is watched by the root app.
             */
            clicked() {
                store.setPlace(this.place)
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