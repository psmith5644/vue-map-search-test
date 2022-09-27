# vue-map-test

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Design Decisions
For this test, I used the Vue CLI to create a Vue.js Single Page Application.  
I've never used Vue before, so I was excited to learn a new framework!
I initially started configuring an Express server and adding Vue on top of it
before realizing the backend was unnecessary, and the simplest configuration was to 
let the Vue CLI handle setting up the SPA.

I used the Bootstrap stylesheet to help with a few elements, although I did the majority of it manually.
Initially, I thought using Bootstrap would trivialize the test, 
so I refrained from using any elements that are entirely from Bootstrap.
In hindsight, at least ~50% of the time spent on this test was just styling CSS, 
so it would have been more sensible to take as many premade elements from Bootstrap as possible.

I was able to implement all of the core features that I wanted to.
There are a couple of tiny styling things that could be improved that I decided weren't necessary 
taking the extra time to do, and I'm overall happy with the current state.\

I separated elements into components as much as possible.  
It also would have been reasonable to combine some of the elements relating to the search function into fewer components.
For example, the ResultsDisplay component is basically just the header for the ResultsList.  
My thinking was that I wanted the Results List to be its own component to separate its dynamic content from the relatively static
ResultsDisplay header.  In case the autocompleting list turned out to be very complicated, it would be better to have it isolated in its component.
The main drawback I experienced from having many nested components is that the data transfer between the components was more involved than if there were fewer components.
Specifically, there was prop drilling with the search query and 
when a search result was clicked, the corresponding place object had to be passed up through the deeply nested SearchResult component to the root app through an event before being passed to the details modal
To resolve these awkward data transfers, a replaced them with a simple reactive object in store.js to store the search query and place object, which are accessed by the components that need them.
Similar functionality could have been provided with Pinia, but this solution was simple, and for the scale of this task I did not think adding additional libraries was necessary.
When the search result is clicked, it needs to trigger the "goToSearchResult" method at the root app level.  
I initially implemented this with an event in great-grandparent of the searchresult component, the search bar, which called a method passing the relevant place object to the root app, which passed it back to the details modal.
To call that event, the search result needed to go up the ancestor chain by continually referencing "$parent" and emitting the event in "SearchBar.vue"  
This implementation seemed poor, so I replaced it by providing/injecting the method from the root app level to "SearchResult.vue", where it is then called.
This also could have been handled with a global event bus or 

The markers for default points of interest have been disabled to de-clutter the map and make the custom location markers clearer.


... state to simplify interaction and stop prop drilling

.. box shadow

.. provide/inject
