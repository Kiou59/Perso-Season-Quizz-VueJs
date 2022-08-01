<script setup>
import { useCounterStore } from '@/stores/counter.js'
const quizz = useCounterStore();


</script>
<template>

<div class="mt-4 block p-6 rounded-lg shadow-lg  max-w-sm m-auto" >
<h1 class="text-white  leading-tight font-medium mb-2" >Votre score</h1>
<p class="text-white mb-4" > {{quizz.intFinalResult}}/20 </p>
<p class="text-white mb-4"> {{quizz.finalResultText}} </p>
<button @click='quizz.retry' class="my-4 block p-6 rounded-lg border  max-w-sm m-auto">Recommencer?</button>
</div>
</template>
<style>
p{
       font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 2.5rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}
h1{
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 3rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}
@media(orientation:portrait){
    p{
       font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 1.5rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}
h1{
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 2rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}
}
</style>