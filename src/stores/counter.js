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
        finalResultTexts:['Même pas un tout petit point? vous pouvez pas rester sur ce score','Je suis sur que vous pouvez mieux faire','Je suis sur que vous avez appris des choses. Vous voulez en apprendre plus?','Pas mal! Vous voulez voir si vous pouvez faire mieux?',"C'est un exploit! Vous voulez confirmer?"],
        finalResultText:''
    }),
    // getters: {
    //     doubleCount: (state) => state.counter * 2
    // },
    actions: {
// recupération des donnée comprise dans le fichier Json
 async initData(){
  await fetch('/source.json')
  .then((res) => res.json() )
  .then(function(myJson) {
    var jsonSeasonsArray= myJson.seasons;
    var jsonFruitsArray=myJson.fruits;
    var jsonVegetablesArray=myJson.vegetables
  // stockage des donnée en local pour reinitiliaser le quizz sans refaire de fetch
    localStorage.setItem("seasonsArray", JSON.stringify(jsonSeasonsArray))
    localStorage.setItem("fruitsArray", JSON.stringify(jsonFruitsArray))
    localStorage.setItem("vegetablesArray", JSON.stringify(jsonVegetablesArray))
  }
  )
  // injection des donnée dans les tableau qui serviront au quizz
  this.seasonsArray=JSON.parse(localStorage.getItem("seasonsArray"))
  this.fruitsArray=JSON.parse(localStorage.getItem("fruitsArray"))
  this.vegetablesArray=JSON.parse(localStorage.getItem("vegetablesArray"))


},
// affectation du texte de fin en fonction du score optenu
finalResultTextSet(){
if(this.intFinalResult==0){
    this.finalResultText=this.finalResultTexts[0]
}else if(this.intFinalResult>0 && this.intFinalResult<=5){
    this.finalResultText=this.finalResultTexts[1]
}else if(this.intFinalResult>5 && this.intFinalResult<=10){
    this.finalResultText=this.finalResultTexts[2]
}else if(this.intFinalResult>10 && this.intFinalResult<=15){
    this.finalResultText=this.finalResultTexts[3]
}else if(this.intFinalResult>15 && this.intFinalResult<=20){
    this.finalResultText=this.finalResultTexts[4]
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
        document.getElementById('total').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
        document.getElementById('cardQuestion').className='hidden'
        document.getElementById('selectedResponse').className='hidden'
    }
},

 async fruitsSelect(){
    this.questionCountListener()
    document.getElementById('0').disabled=''
    document.getElementById('1').disabled=''
    document.getElementById('2').disabled=''
    document.getElementById('3').disabled=''
    this.responseArray=[]
      document.getElementById('question').className='hidden'
        this.textResult=''
        this.vueResult=''
        this.vueResultClass='mb-2 font-bold tracking-tight text-white dark:text-white'
        this.seasonsArray.forEach(season=>{
            document.getElementById(`${season.id}`).className=this.classSeasonSleep
        })
        let m=0;
        m=(Math.floor(Math.random() * this.fruitsArray.length))
      if(this.s==0)
        {
        this.s=1
        this.question=this.fruitsArray[m]
        this.restFruits =this.fruitsArray.splice(m,1)
      this.seasonQuestion=this.question.seasonId.map(e=>e)
        this.seasonResponse=this.seasonQuestion.map(season=>this.seasonsArray[season].text)
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
        this.seasonResponse=this.seasonQuestion.map(season=>this.seasonsArray[season].text)
        this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
        for (let i=0; i<=(this.seasonResponse.length-1);i++){
          if(i == (this.seasonResponse.length-3)){
            this.textResult+=`${this.seasonResponse[i]}, `
          }else if(i==(this.seasonResponse.length-2)){
            this.textResult+=`${this.seasonResponse[i]} et `
          }else{
            this.textResult+=`${this.seasonResponse[i]}. `
          }
        }
        }    
        
      
},

 response(id){
if(this.responseArray.includes(id)){
        this.restFruits=this.responseArray.splice(this.responseArray.indexOf(id,1))
        document.getElementById(`${id}`).className=this.classSeasonSleep
        
    }else{
        this.responseArray.push(id)
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

        if(totalResponseArray==totalQuestionArray&&lenQuestion==lenResponse){
            this.vueResult=`Vous avez raison ${this.question.name} sont récoltés  ${this.textResult}`
            this.vueResultClass='mb-2 font-bold tracking-tight text-green-700 dark:text-green-700'

          this.finalResult.push(2)
          this.intFinalResult=this.finalResult.reduce((a,b)=>a+b)
          this.responseArray.forEach(response=>{
            document.getElementById(`${response}`).className=this.classSeasonSleepOk
        })
        }
        
        else if(lenQuestion<lenResponse){
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
        }
        
        else if((lenQuestion==2&&lenResponse==1)&&(intQuestionArray.includes(this.responseArray[0]))){
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
        }
        
        else if((lenQuestion==3&&lenResponse==2)&&((stringQuestionArray.includes(this.responseArray[0]))&&(stringQuestionArray.includes(this.responseArray[1])))){
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
        }
        
        else{
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
          console.log(document.getElementById('total').className)
        },
        retry(){
            if(this.fruitsArray.length>5 && this.vegetablesArray.length>5){
            this.questionCount=0
            this.intFinalResult=0
            this.finalResult=[]
            this.startGame()
            document.getElementById('total').className='hidden'
            document.getElementById('cardQuestion').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
            document.getElementById('selectedResponse').className=''
        }else{
            this.seasonsArray=JSON.parse(localStorage.getItem("seasonsArray"))
            this.fruitsArray=JSON.parse(localStorage.getItem("fruitsArray"))
            this.vegetablesArray=JSON.parse(localStorage.getItem("vegetablesArray"))
            this.questionCount=0
            this.intFinalResult=0
            this.finalResult=[]
            this.startGame()
            document.getElementById('total').className='hidden'
            document.getElementById('cardQuestion').className='mx-auto max-w-sm rounded-lg border-4 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'
            document.getElementById('selectedResponse').className=''
        }

        }
    }
}
)