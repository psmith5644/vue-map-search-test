import {reactive} from 'vue'

// A store variable used to simplify some of the data interactions between components.
export const store = reactive({
    place: {},
    searchQuery: "",
    setPlace(place) {
        this.place = place;
    },
})