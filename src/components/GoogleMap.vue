<!-- Copied from: https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/ -->

<template>
    <div class="GMap"></div>
</template>

<script>
import gmapsInit from '@/gmaps.js';
import {toRaw} from 'vue'
    
    export default {
      name: 'GMap',
      data() {
        return {
          google: "",
          map: "",
          marker: null,
        }
      },
      emits: ['clickedMarker'],
      methods: {
        /**
         * Creates a clickable location marker for the provided place
         * and pans the map to the marker.  Clicking the marker
         * displays the details modal for that location.
         * @param {Object} place - all data about a place
         */
        createMarker(place) {
          
          if (this.marker !== null) {
            this.deleteMarker();
          }


                    
          const position = {lat: place.location.lat, lng: place.location.lon};
          this.marker = new this.google.maps.Marker({
            position: position,
            map: this.map,
            icon: 'images/icon-pin.svg',
          });
          
          
          // zoom in to the marker, but not out.
          this.map.panTo(position);
          if (this.map.zoom < 15) {
            this.map.setZoom(15);
          }

          this.marker.addListener("click", () => {
            this.$emit('clickedMarker', place);
          })
        },

        /**
         * When a new marker is created, the previous one is deleted.
         */
        deleteMarker() {
          let marker = toRaw(this.marker)
          marker.setMap(null)
          marker = null
        },

      },
      /**
       * Creates the map and centers it on Boston
       */
      async mounted() {
        const styles = [{
          featureType: "poi",
          elementType: "labels",
          stylers: [{
            visibility: "off"
          }]
      }];

        try {
          this.google = await gmapsInit();
          this.map = new this.google.maps.Map(this.$el, {
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: styles,
          });


          const starting_location = { lat: 42.34579953107398, lng: -71.04759111555833 }
          this.map.setCenter(starting_location);
          this.map.setZoom(15);


        } catch (error) {
          console.error(error);
        }
      },
    };

</script>

<style>
    html,
    body {
      margin: 0;
      padding: 0;
    }
    
    .GMap {
      width: 100vw;
      height: 100vh;
    }
    </style>