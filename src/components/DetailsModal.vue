<!-- The DetailsModal displays details about a place when a marker for that place is clicked. -->
<template>
    <div id="detailsModalContainer">
        <div class="overlay center rounded" id="detailsModal">
            <div class="clearfix" id="detailsModalHead">
                <div class="inline" id="modalHeadText">
                    <img class="inline clearfix" id="pin" src="../../public/images/map-marker-2-xxl.png"/>
                    <div class="inline" style="padding-left: 0;">
                        <div id="detailsTitle">{{this.place.name}}</div>
                        <div id="detailsCoords">{{this.place.location.lat}}, {{this.place.location.lon}}</div>
                    </div>
                </div>
                <button class="rounded bold" id="websiteButton" 
                    v-if="hasWebsite()" @click="clickButtonWebsite">
                    Visit Website
                </button>
    
            </div>
            <div class="clearfix" id="detailsModalBody">
                <div v-if="hasDescription()">{{this.place.details.description}}</div>
                <div v-else id="noDescription">No Description</div>
                <div class="clearfix" id="imageContainer">
                    <img v-for="imageLink in images" class="" id="modalImages" :src="imageLink" :key="imageLink"
                        @error="errorLoadingImage()"/>
                </div>  
            </div>
        </div>
        <button class="btn-close" id="detailsModalExit" @click="this.$emit('closeDetailsModal')" ></button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                images: []
            }
        },
        props: {
            place: Object,
        },
        emits: ['closeDetailsModal'],
        methods: {
            /**
             * @return {Boolean} - true if the place has a website
             */
            hasWebsite() {
                if ('details' in this.place && 'website' in this.place.details) {
                    return true;
                }
                return false;
            },
            /**
             * @return {Boolean} - true if the place has a description
             */
            hasDescription() {
                if ('details' in this.place && 'description' in this.place.details) {
                    return true;
                }
                return false;
            },

            /**
             * When the 'visit website' button is pressed, opens a new tab with link to the website.
             * Note: hard-coded the link because the links in the sample data don't work
             * because they use https instead of http
             */
            clickButtonWebsite() {
                window.open("http://groundsignal.com", "_blank");
            },
            
            /**
             * @return {String[]} - a list of links to a place's images 
             */
            getImages() {
                if ('images' in this.place) {
                    this.images = this.place.images
                } else {
                    this.images = []
                }
            },
            /**
             * Called when an image fails to load.
             * Removes the image from the list of images being displayed.
             * @param {String} imageURL 
             */
            errorLoadingImage(imageURL) {
                console.log("error loading image")
                this.images.splice(this.images.indexOf(imageURL), 1)
            }
        },
        mounted() {
            this.getImages();
        }
    }
</script>

<style>
    .rounded {
        border-radius:1px;
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
        width: 35%;
        min-width: 300px;
        max-width: 600px;
        height: 40%;
        background-color: white;
        box-shadow: 0 0 0 100vmax rgba(0,0,0,.6);
    }


    #detailsModalHead {
        border-bottom: 2px solid lightgrey;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    #detailsModalBody {
        padding: 8px;
        text-align: left;
        color: black;
    }

    #detailsTitle {
        text-align: left;
        font-weight: bold;
        font-size: 1em;
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
        padding-left: 16px;
        padding-right: 16px;
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
        max-width: 30%;
        margin: 8px;
    }
    
    #imageContainer {
        position: absolute;
        bottom: 8px;
        left: 8px;
        right: 8px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        margin: auto;
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

    #noDescription {
        font-style: italic;
    }

    #detailsModalContainer {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>