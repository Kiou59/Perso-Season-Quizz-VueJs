<script setup>
import { ref, computed } from 'vue'

import { useCounterStore } from '@/stores/counter.js'
const quizz = useCounterStore();
</script>
<template>
<div class='context'>



        <h1>BIENVENUE SUR SEASONQUIZZ!</h1>
        <section>
            <p>Il est important de privilégier les fruits et légumes de saison pour leur goût, mais aussi afin de réduire notre impact écologique.</p>
        </section>
        <section class>
            <p>Encore faut-il les connaitres!</p>
        </section>
        <section>
            <p>Testez vos connaissances sur 5 fruits et 5 légumes tirés au sort</p>
            <p>Apprenez et recommencer!</p>
        </section>
        <section @click='quizz.startGame'  >
<button  type="button" id='startButton' class="btn btn-lg btn-light mx-auto">START</button>
        </section>

</div>

</template>

<style >
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');
* {
    margin: 0px;
    padding: 0px;
}

body {
    font-family: 'Exo', sans-serif;
    display:flex;
    flex:row;
    text-align:center;
}
#app{
  margin:auto;
}
.context {
    width: auto;


}

.context h1 {
    color: #fff;
    font-size: 6rem;
    margin-bottom:8rem
}

.context p {

    color: #fff;
    font-size: 1.7rem;
}


/* area     background: #ff7e50;
    background: -webkit-linear-gradient(to left, #ffa402, #ff7e50); */

.context section {
    margin: auto;
    margin-bottom: 10rem;
      color: #fff;
    font-size: 1.7rem;
    font-weight:bold;
}


    


    



</style>

