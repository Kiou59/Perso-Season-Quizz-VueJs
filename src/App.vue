<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import SeasonSelectRow from '@/components/SeasonSelectRow.vue'
import CardVegetable from '@/components/CardVegetable.vue'
import Buble from '@/components/Buble.vue'

import { useCounterStore } from '@/stores/counter.js'
fetch('/source.json')
  .then((res) => res.json() )
  .then(function(myJson) {
    var jsonSeasonsArray= myJson.seasons;
    var jsonFruitsArray=myJson.fruits;
    var jsonVegetablesArray=myJson.vegetables
    console.log(jsonSeasonsArray)
    localStorage.setItem("seasonsArray", JSON.stringify(jsonSeasonsArray))
    localStorage.setItem("fruitsArray", JSON.stringify(jsonFruitsArray))
    localStorage.setItem("vegetablesArray", JSON.stringify(jsonVegetablesArray))
  }
  )
const quizz=useCounterStore();


</script>

<template>

<HelloWorld id='firstPage'  />
<CardVegetable id='cardQuestion' :class="quizz.classHidden" />
<SeasonSelectRow id='selectedResponse'  />
<Buble id="note" :class="quizz.classHidden" />








</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');


body {
    font-family: 'Exo', sans-serif;
    background: #ff7e50;
    display:flex;
    flex:row;
    text-align:center;
}
#app{
  position:fixed;
  margin:auto;
  width: 100%;
  height: 100%;
  animation-name: animate;
  animation-duration: 7s;
  animation-timing-function: linear;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  background-image:
    radial-gradient(
      circle 600px at 20% 40%,
      rgba(255, 164, 2, 0.5) 40%, 
      rgba(232, 175, 75, 0.1)
    ),
    radial-gradient(
      circle 600px at 60% 60%,
     rgba(255, 164, 2, 0.5) 50%, 
     rgba(232, 175, 75, 0.1)
    ),
    linear-gradient(
      20deg, 
      rgba(255, 213, 139),
      rgba(255, 126, 80)),
    linear-gradient(
      -18deg, 
      rgba(255, 126, 80), 
      rgba(255, 213, 139) 25% ,
      rgba(255, 126, 80) 85%);
  background-blend-mode: 
    color-burn,
    color-burn, 
    overlay;
}

@keyframes animate {
  0% {
    background-size:
      100%,
      100%,
      100%,
      100%;
    background-position:
      center,
      top,
      center,
      center;
  }
  100% {
    background-size:
      500%,
      400%,
      200%,
      300%;
    background-position:
      right,
      left,
      center,
      top;
  }
}

</style>
