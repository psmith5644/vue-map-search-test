<!-- Header for the search results.  Appears below the search bar.
It's child component, the results list, is displayed below it. -->
<template>
    <div class="overlay shadow-lg" id="resultsDisplay">
        <div v-if="filteredResults.length !== 1" class="bold" id="resultHead">
            Found {{filteredResults.length}} Results:
        </div>
        <div v-else class="bold" id="resultHead">
            Found 1 Result:
        </div>
        <!-- Gets the list of search results from the results list so that it can display the number of results. -->
        <div id="resultBody" class="clearfix">
            <ResultsList @update:filteredResults="(filteredResults) => this.filteredResults = filteredResults" 
                ref="ResultsList"/>
        </div>
            
    </div>
</template>

<script>
    import ResultsList from './ResultsList.vue';

    export default {
        data() {
            return {
                filteredResults: []
            }
        },
        components: {
            ResultsList,
        },
    }
</script>

<style>
    #resultsDisplay {
        margin-top: 8px;
        width: 100%;
    }

    #resultHead {
        background-color: #4f7dfa;
        color: white;
        border-radius: 3px;
        text-align: left;
        padding: 8px;
        font-size: .75em;
    }

    #resultBody {
        background-color: white;
        border-radius: 3px;
    }


    .bold {
        font-weight: bold;
    }

</style>