import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        seasonsArray:[],
        fruitsArray:[],
        vegetablesArray:[],
        classShow:'',
        classHidden:'hidden',
        classRow:'hidden',
        selectFruits:[],
        fruits:[],
        question:'',
        seasonQuestion:'',
        seasonResponse:'',
        finalResult:[],
        intFinalResult:0,
        finalResultProportion:0,
        textResult:'' , 
        responseArray:[],
        restFruits:[],
        winterId:0,
        springId:1,
        fallId:2,
        summerId:3,
        vueResult:'',
        vueResultClass:'mb-2 font-bold tracking-tight text-white dark:text-white',
        s:0,
        step:0,
        questionCount:0,
        classSeasonActive:'text-white rounded-lg border-4 bg-gray-500 bg-opacity-50 border-gray-200 p-2',
        classSeasonSleep:'text-white rounded-lg border-4  border-gray-200 p-2',
        classSeasonSleepOk:'text-white rounded-lg border-4 bg-green-500 border-gray-200 p-2',
        classSeasonSleepAlmost:'text-white rounded-lg border-4 bg-orange-400 border-gray-200 p-2',
        classSeasonSleepWrong:'text-white rounded-lg border-4 bg-red-800 border-gray-200 p-2',
        finalResultTexts:['Même pas un tout petit point? vous pouvez pas rester sur ce score','Je suis sur que vous pouvez mieux faire','Je suis sur que vous avez appris des choses. Vous voulez en apprendre plus?','Pas mal! Vous voulez voir si vous pouvez faire mieux?',"C'est un! Vous voulez confirmer?"],
        finalResultText:''
    }),
    // getters: {
    //     doubleCount: (state) => state.counter * 2
    // },
    actions: {
        // affiche la pop up, son niveau actuel et le texte en fonction du niveau en cour
 async initData(){
  await fetch('/source.json')
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
  this.seasonsArray=JSON.parse(localStorage.getItem("seasonsArray"))
  console.log(this.seasonsArray)
  this.fruitsArray=JSON.parse(localStorage.getItem("fruitsArray"))
  console.log(this.fruitsArray)
  this.vegetablesArray=JSON.parse(localStorage.getItem("vegetablesArray"))
  console.log(this.vegetablesArray)

},finalResultTextSet(){
if(this.intFinalResult==0){
    this.finalResultText=this.finalResultTexts[0]
}else if(this.intFinalResult>0 && this.intFinalResult<=5){
    this.finalResultText=this.finalResultTexts[1]
}else if(this.intFinalResult>5 && this.intFinalResult<=10){
    this.finalResultText=this.finalResultTexts[2]
}else if(this.intFinalResult>10 && this.intFinalResult<=15){
    this.finalResultText=this.finalResultTexts[2]
}else if(this.intFinalResult>15 && this.intFinalResult<=20){
    this.finalResultText=this.finalResultTexts[3]
}
},

startGame(){
    document.getElementById('firstPage').className='hidden'
    document.getElementById('cardQuestion').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
    this.classRow=''
    this.fruitsSelect()
},

questionCountListener(){
    
    if(this.questionCount==10){
        this.finalResultTextSet()
        document.getElementById('note').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
        document.getElementById('cardQuestion').className='hidden'
        document.getElementById('selectedResponse').className='hidden'
        console.log(this.finalResultText)
    }
},disabledChek(id){
    if(document.getElementById(`${id}`).disabled=='true'){
        document.getElementById(`${id}`).disabled='false'
    }
},

 async fruitsSelect(){
    document.getElementById('0').disabled=''
    document.getElementById('1').disabled=''
    document.getElementById('2').disabled=''
     document.getElementById('3').disabled=''
    this.responseArray=[]
    this.questionCountListener()
       document.getElementById('question').className='hidden'
        this.textResult=''
        this.vueResult=''
        this.vueResultClass='mb-2 font-bold tracking-tight text-white dark:text-white'
        console.log(this.finalResultProportion)
        // document.getElementById('resultat').className='text-white rounded-lg border-4 border-gray-200 p-2'
        
        this.seasonsArray.forEach(season=>{
            document.getElementById(`${season.id}`).className=this.classSeasonSleep
        })
        let m=0;
        
      
        m=(Math.floor(Math.random() * this.fruitsArray.length))
        if(this.finalResult.length==0){
            
        }
      if(this.s==0)
        {
        this.s=1
        this.question=this.fruitsArray[m]
        this.restFruits =this.fruitsArray.splice(m,1)
      this.seasonQuestion=this.question.seasonId.map(e=>e)
        console.log(this.question.name)
        console.log(this.seasonsArray)
        this.seasonResponse=this.seasonQuestion.map(season=>this.seasonsArray[season].text)
        console.log(this.finalResult)

        console.log(this.seasonResponse)
        console.log(this.seasonQuestion)
        for (let i=0; i<=(this.seasonResponse.length-1);i++){
          if(i == (this.seasonResponse.length-3)){
            this.textResult+=`${this.seasonResponse[i]}, `
          }else if(i==(this.seasonResponse.length-2)){
            this.textResult+=`${this.seasonResponse[i]} et `
          }else{
            this.textResult+=`${this.seasonResponse[i]}. `
          }
        }}else if(this.s==1){
            this.s=0
        this.question=this.vegetablesArray[m]
        this.restFruits =this.vegetablesArray.splice(m,1)
      this.seasonQuestion=this.question.seasonId.map(e=>e)
        console.log(this.question.name)
        console.log(this.seasonsArray)
        this.seasonResponse=this.seasonQuestion.map(season=>this.seasonsArray[season].text)
        console.log(this.finalResult)
        this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
        console.log(this.seasonResponse)
        console.log(this.seasonQuestion)
        for (let i=0; i<=(this.seasonResponse.length-1);i++){
          if(i == (this.seasonResponse.length-3)){
            this.textResult+=`${this.seasonResponse[i]}, `
          }else if(i==(this.seasonResponse.length-2)){
            this.textResult+=`${this.seasonResponse[i]} et `
          }else{
            this.textResult+=`${this.seasonResponse[i]}. `
          }
        }
        }     console.log(this.intFinalResult)
        
      
},
 response(id){
if(this.responseArray.includes(id)){
        this.restFruits=this.responseArray.splice(this.responseArray.indexOf(id,1))
        console.log(document.getElementById(`${id}`).className)
        document.getElementById(`${id}`).className=this.classSeasonSleep
        
    }else{
        this.responseArray.push(id)
        console.log(this.responseArray)
        console.log(document.getElementById(`${id}`).className)
        document.getElementById(`${id}`).className=this.classSeasonActive


    }},
    Resultat(){
        document.getElementById('0').disabled='true'
        document.getElementById('1').disabled='true'
        document.getElementById('2').disabled='true'
         document.getElementById('3').disabled='true'
        this.finalResultTextSet()
        document.getElementById('resultat').className='hidden'
        document.getElementById('question').className='text-white rounded-lg border-4 border-gray-200 p-2'    
        console.log(this.responseArray[0])
        this.responseArray=this.responseArray.sort()
        this.seasonQuestion=this.seasonQuestion.sort()
        let totalQuestionArray=null
        let lenQuestion=this.seasonQuestion.length
        let totalResponseArray=null
        let lenResponse=this.responseArray.length
        let intQuestionArray=this.seasonQuestion.map((e)=>parseInt(e))
        let stringQuestionArray=this.seasonQuestion.toString()
        totalResponseArray = this.responseArray.reduce((a,b)=>parseInt(a)+parseInt(b))
        totalQuestionArray=this.seasonQuestion.reduce((a,b)=>parseInt(a)+parseInt(b))
      console.log(intQuestionArray)
        console.log(stringQuestionArray)
        console.log(totalQuestionArray)
        console.log(this.seasonQuestion)
        if(lenResponse==null){
            this.vueResult=`Vous devez séléctionner une réponse.`
        }
        else if(totalResponseArray==totalQuestionArray&&lenQuestion==lenResponse){
            this.vueResult=`Vous avez raison ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-green-700 dark:text-green-700'
          console.log(this.fruits)
          this.finalResult.push(2)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
          this.responseArray.forEach(response=>{
            document.getElementById(`${response}`).className=this.classSeasonSleepOk
        })
        }        else if(totalResponseArray==totalQuestionArray&&lenQuestion==lenResponse){
            this.vueResult=`Vous avez raison ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-green-700 dark:text-green-700'
          console.log(this.fruits)
          this.finalResult.push(2)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
          this.responseArray.forEach(response=>{
            document.getElementById(`${response}`).className=this.classSeasonSleepOk
        })
        }
        else if(this.responseArray.length==0&&this.seasonQuestion.length>1){
          this.vueResult=`Vous devez séléctionner au moins une réponse (mais plusieurs réponse pour cette question... C'est plutot conseillé <<wink--wink>> )`
        }else if(this.responseArray.length==0&&this.seasonQuestion.length==1){
            this.vueResult=`Vous devez séléctionner une réponse.`
        }else if(lenQuestion<lenResponse){
            this.vueResult=`Raté  ${this.question.name} ne sont récoltés qu' ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-red-600 dark:text-red-600'
            this.responseArray.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepWrong
            })
            this.seasonQuestion.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepOk
            })
          this.finalResult.push(0)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
        }else if((lenQuestion==2&&lenResponse==1)&&(intQuestionArray.includes(this.responseArray[0]))){
            this.vueResult=`C'est pas tout à fait ça ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-amber-600 dark:text-amber-600'

            this.seasonQuestion.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepOk
            })
            this.responseArray.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepAlmost
            })
          this.finalResult.push(1)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
        }else if((lenQuestion==3&&lenResponse==2)&&((stringQuestionArray.includes(this.responseArray[0]))&&(stringQuestionArray.includes(this.responseArray[1])))){
            this.seasonQuestion.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepOk
            })
            this.responseArray.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepAlmost
            })
            this.vueResult=`C'est pas tout à fait ça ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-amber-600 dark:text-amber-600'
          this.finalResult.push(1)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
        }else{
            this.vueResult=`Raté ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-red-600 dark:text-red-600'
            this.finalResult.push(0)
            this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
            this.seasonQuestion.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepOk
            })
            this.responseArray.forEach(response=>{
                document.getElementById(`${response}`).className=this.classSeasonSleepWrong
            })
          }

          this.questionCount++
          console.log(this.questionCount)
         
        },
        retry(){
            if(this.fruitsArray.length>5 && this.vegetablesArray.length>5){
            this.questionCount=0
            this.intFinalResult=0
            this.finalResult=[]
            this.startGame()
            document.getElementById('note').className='hidden'
            document.getElementById('cardQuestion').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
            document.getElementById('selectedResponse').className=''
        }else{
            this.seasonsArray=JSON.parse(localStorage.getItem("seasonsArray"))
            console.log(this.seasonsArray)
            this.fruitsArray=JSON.parse(localStorage.getItem("fruitsArray"))
            console.log(this.fruitsArray)
            this.vegetablesArray=JSON.parse(localStorage.getItem("vegetablesArray"))
            console.log(this.vegetablesArray)
            this.questionCount=0
            this.intFinalResult=0
            this.finalResult=[]
            this.startGame()
            document.getElementById('note').className='hidden'
            document.getElementById('cardQuestion').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
            document.getElementById('selectedResponse').className=''
        }

        }
    }
}
)