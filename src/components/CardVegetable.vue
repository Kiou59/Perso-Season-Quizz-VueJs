<script setup>
import { useCounterStore } from '@/stores/counter.js'
const quizz = useCounterStore();

</script>
<template>
<div id='card' class="max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    
        <img class="opacity-70 rounded-t-lg" :src="quizz.question.src" alt="" />
    
    <div class="p-5">
        
            <h5 class="mb-2 font-bold tracking-tight text-white dark:text-white">A quelle(s) saison(s) sont récoltés {{quizz.question.name}}</h5>
        
    
    </div>
    <div class="mb-2 font-bold tracking-tight text-white dark:text-white">{{ quizz.vueResult }}</div>
</div>
</template>
<style scoped>
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
</style>