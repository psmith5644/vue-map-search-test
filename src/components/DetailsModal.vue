<template>
    <div class="overlay center rounded" id="detailsModal">
        <div class="clearfix" id="detailsModalHead">
            <div class="inline" id="modalHeadText">
                <img class="inline clearfix" id="pin" src="../../public/images/map-marker-2-xxl.png"/>
                <div class="inline" style="padding-left: 0;">
                    <div id="detailsTitle">{{this.placeInfo.name}}</div>
                    <div id="detailsCoords">{{this.placeInfo.location.lat}}, {{this.placeInfo.location.lon}}</div>
                </div>
            </div>
            <button class="rounded" id="websiteButton" @click="buttonWebsite">
                Visit Website
            </button>
        </div>
        <div class="clearfix" id="detailsModalBody">
            <div v-if="hasDescription">{{this.placeInfo.details.description}}</div>
            <div v-else>No Description</div>
            <div class="clearfix" id="images">
                <img class="inline" id="modalImages" src="../../public/images/icon-pin.svg"/>
                <img class="inline" id="modalImages" src="../../public/images/icon-pin.svg"/>
                <img class="inline" id="modalImages" src="../../public/images/icon-pin.svg"/>
            </div>  
        </div>
    </div>
    <button class="btn-close" id="detailsModalExit" @click="this.$emit('closeDetailsModal')"></button>
</template>

<script>
    export default {
        props: {
            placeInfo: Object
        },
        emits: ['closeDetailsModal'],
        methods: {
            hasWebsite() {
                if ('details' in this.placeInfo && 'website' in this.placeInfo.details) {
                    return true;
                }
                return false;
            },
            hasDescription() {
                if ('details' in this.placeInfo && 'description' in this.placeInfo.details) {
                    return true;
                }
                return false;
            },
            buttonWebsite() {
                console.log("opening new window to website")
                window.open(this.placeInfo.details.website, "_blank");
            }
        },
    }
</script>

<style>
    .rounded {
        border-radius:2px;
        border-width: 1px;
    }
    
    .inline {
        float: left;
        padding: 8px;
    }

    .center {
        margin: auto;
    }

    #detailsModal {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 25%;
        min-width: 300px;
        height: 35%;
        background-color: white;
        box-shadow: 0 0 0 100vmax rgba(0,0,0,.6);
        /* pointer-events: none; */
    }

    #detailsModalHead {
        border-bottom: 2px solid lightgrey;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    #detailsModalBody {
        padding: 8px;
        text-align: left
    }

    #detailsTitle {
        text-align: left;
        font-weight: bold;
    }

    #detailsCoords {
        color: lightgrey;
        padding-bottom: 0px;
        padding-left: 0;
        margin-left: 0;
        font-size: .75em;
        text-align: left;
    }
    

    .clearfix::after {
        content: "";
        clear: both;
        display: table;
    }

    #websiteButton {
        padding: 8px;
        background-color: rgb(75, 133, 226);
        margin-left: auto;
        border-width: 0;
        color: white;
        font-size: x-small; 
        text-decoration: none;
        float: right;
        position: absolute;
        right: 8px;
        top: 14px;
    }

    #modalImages {
        float: left;
        max-width: 30%;
    }
    
    #images {
        position: absolute;
        bottom: 8px;
    }

    #modalHeadText {
        padding: 0;
        display: flex;
        align-items: center;
    }

    #detailsModalExit {
        position: absolute;
        top: 50px;
        right: 50px;
        z-index: 200;
    }

    #pin {
        height: 45px;
        width: 45px;
        margin-right: 0;
    }
</style>