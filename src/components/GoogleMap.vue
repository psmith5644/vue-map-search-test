<!-- Taken from: https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/ -->

<template>
    <div class="GMap"></div>
</template>

<script>
import gmapsInit from '../gmaps.js';
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
        createMarker(placeInfo) {
          
          if (this.marker !== null) {
            this.deleteMarker();
          }
          
          console.log("Creating marker");
          const position = {lat: placeInfo.location.lat, lng: placeInfo.location.lon};
          this.marker = new this.google.maps.Marker({
            position: position,
            map: this.map
          });


          this.map.setCenter(position);
          this.map.setZoom(12);

          this.marker.addListener("click", () => {
            this.$emit('clickedMarker', placeInfo);
          })
        },

        deleteMarker() {
          console.log("deleting marker")
          let marker = toRaw(this.marker)
          marker.setMap(null)
          marker = null
        },

      },
      async mounted() {
        try {
          this.google = await gmapsInit();
          const geocoder = new this.google.maps.Geocoder();
          this.map = new this.google.maps.Map(this.$el, {
            fullscreenControl: false,
            mapTypeControl: false,
            streetViewControl: false
          });


    
          geocoder.geocode({ address: 'Austria' }, (results, status) => {
            if (status !== 'OK' || !results[0]) {
              throw new Error(status);
            }
    
            this.map.setCenter(results[0].geometry.location);
            this.map.fitBounds(results[0].geometry.viewport);
          });
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