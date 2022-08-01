<script setup>

import { ref, computed } from 'vue'
import { useCounterStore } from '@/stores/counter.js';
const quizz = useCounterStore();

</script>

<template>
<div  :class='quizz.classRow' >
<div  @click='quizz.fruitsSelect' id='question' class=' text-white rounded-lg border-4 border-gray-200 p-2'> question suivante </div>
<div v-if=" quizz.responseArray.length >= 1" @click='quizz.Resultat' id='resultat' class='text-white rounded-lg border-4 border-gray-200 p-2'> Soumettre votre réponse</div>
<section id="wrapperSeason">
 
<button @click='quizz.response(0)'  :class='quizz.classSeasonSleep'  id='0'>
  {{quizz.seasonsArray[0].text}}

</button>
<button @click='quizz.response(1)'  :class='quizz.classSeasonSleep'  id='1'>
  {{quizz.seasonsArray[1].text}}

</button>
<button @click='quizz.response(2)'  :class='quizz.classSeasonSleep'  id='2'>
  {{quizz.seasonsArray[2].text}}

</button>
<button @click='quizz.response(3)'  :class='quizz.classSeasonSleep'  id='3'>
  {{quizz.seasonsArray[3].text}}

</button>

</section>
</div>

</template>
<style>

div {
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 2rem;
    text-align:center;
    width:auto;
    margin: 5px;
   
}
#wrapperSeason{
    display:flex;
    justify-content:space-around;
}
@media (orientation:portrait){
    div {
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 1rem;
    text-align:center;
    width:auto;
    margin: 5px;
   
}
#wrapperSeason{
    display:flex;
    flex-wrap: wrap;
    justify-content:space-around;
}
}
</style>