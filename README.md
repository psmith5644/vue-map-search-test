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

### Frameworks and libraries

For this test, I used the Vue CLI to create a Vue.js Single Page Application.  
I've never used Vue before, so I was excited to learn a new framework!
I initially started configuring an Express server and adding Vue on top of it
before realizing the backend was unnecessary, and the simplest configuration was to 
let the Vue CLI handle setting up the SPA.

I used Bootstrap's stylesheet to help with the CSS of a few elements, although I did the majority of it manually.
Initially, I thought using Bootstrap would trivialize the test, 
so I refrained from using any elements that are entirely from Bootstrap.
I spent a large portion of the time spent on this test just styling CSS, 
so it would have been more sensible to take as many premade elements from Bootstrap as possible.

I used a store in the form of a reactive object in 'store.js' to create a global state and simplfiy some interactions between components. 
This could be replaced with Pinia, but I decided for the scale of this app that was unnecessary, and using a reactive object works fine.
For a more complex project or in a production environment I would likely use Pinia; 
from my cursory research I understand it is a more secure and robust way of implementing a store, but
for this test I preferred to keep it simple and not use anything that I didn't need to.

I referred to a [blog](https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/) on how to implement
the Google Maps Javascript API as a Vue.js component to make the map easier to manage.

### Component Communication

I separated elements into components to keep logic separated. I erred on the side of potentially having too many components
as opposed to having too few.  One benefit of this approach is that the logic of different components is clearly separated.  
In particular, I wanted to isolate the autocompleting results list from the rest of the search functionality in case that logic became complicated.
One of the drawbacks of having so many components is that it can make the relationships among components more complex.
There ended up being some prop drilling: the search query had to be passed from the search bar through the results display to the results list to generate the search results.
This was not a severe problem but it was a little messy, so I created a store to hold the search query and resolve the prop drilling.

A related issue also occured: after clicking on a Search Result, which is a deeply nested component, the app tells the google map to make a marker corresponding to that place and pan the map to it; 
it also tells the search bar to populate the input with the full place name.
Initially, to convey the message to the google map, I used an event to pass the place object to the root app, which then passed it to the google map.  
However, the event had to be emitted from a direct child of the root app.  So the search result component would call refer to its great grandparent to emit the event like so:
`this.$parent.$parent.$parent.emit['clickedSearchResult', place]`
This was clearly a poor and unscalable way to communicate between components.
One way to solve it would be to use a global event bus so that the search result could emit an event directly to the google map to create the corresponding marker.
However, my understanding is that global event buses are considered bad practice.  
I tried having the result component receive the method from the root app that tells the google map to create the marker using the provide/inject syntax.  This works and is a little less messy,
but is also somewhat confusing because a method at the root app is being called from a deeply nested component, so the logic is in an unexpected place.
I finally settled on creating a watcher at the app level that detects when the searchResult updates the state in store.js.  When the current place changes, the app detects that and calls the necessary methods.
I think this is the best solution of the options that I considered because it is the most clear and understandable: it brings all the logic together to the parent, which then calls the appropriate methods in its child components.  

### Potential Improvements

Because this application is obviously not meant for production and is literally called 'front-end', I used as few tools as possible to keep things simple.

If I were developing this application for a production environment, I would prioritize scalibility and reliability more heavily.
The most basic steps to do this would be to use Pinia for the data store, because it is more robust and reliable.  
The application also does not have a backend database, because in its current state it has no need for one, 
but if the application grew to have any more complex features, such as storing users, it would need a database.
The application would also need a backend framework such as Express.js to handle routing and backend logic.

Aside from the major but currently unnecessary architectural improvements, the only improvements that I would make to the app as it is
are some small improvemts to the styling.  For example, the traffic chart, implemented with chart.js, was a late addition to the details modal
and was not properly planned for in the details modal design, so the details modal could use a bit of an overhaul to make sure the chart 
fits with the rest of the component more reliably and aesthetically.

### Other notes

The markers for default points of interest have been disabled to de-clutter the map and make the custom location markers clearer.