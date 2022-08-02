<script setup>
import { useCounterStore } from '@/stores/counter.js'
const quizz = useCounterStore();





</script>
<template>
<div id='card' class="bg-gray-800 max-w-sm rounded-lg border-4 border-gray-700 dark:text-white dark:bg-gray-800  ">
    
        <img class=" rounded-t-lg" :src="quizz.question.src" alt="" />
    
    <div class="p-5">
        
            <h5 class="mb-2 font-bold tracking-tight text-white dark:text-white">A quelle(s) saison(s) sont récoltés {{quizz.question.name}}?</h5>
        
    
    </div>
    <div :class="quizz.vueResultClass">{{ quizz.vueResult }}</div>
</div>
</template>
<style scoped>
 #card {
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 1rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
    background:grey
}
h5{
   font-size: 1rem; 
}
div{
     font-size: 1rem; 
}
@media( orientation:portrait) {
 #card{
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 1.7rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}

}
@media (height>=720px)
{
     #card{
    font-family: 'Exo', sans-serif;
    font-weight:bold;
    color: #fff;
    font-size: 2.5rem;
    text-align:center;
    width:auto;
    margin: auto;
    color:white;
}
    .context section {
    margin: auto;
    margin-bottom: 4rem;
      color: #fff;

    font-weight:bold;
}
.context h1 {
    color: #fff;
    margin-bottom:6rem;
}

}
@media (height<=520px)
{
p {

    color: #fff;
    font-size: 0.8rem;
} section {
    margin: auto;
    margin-bottom: 0.4rem;
      color: #fff;
    font-size: 1rem;
    font-weight:bold;
}
h1 {
    color: #fff;
    margin-bottom:1rem;
    font-size:1em;
}

}



</style>