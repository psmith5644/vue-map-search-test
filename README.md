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

## Overview
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
The main drawback I experienced from having many components is that the data transfer between the components is more involved than if there were fewer components.
Alternatively, this issue could be solved with the  

