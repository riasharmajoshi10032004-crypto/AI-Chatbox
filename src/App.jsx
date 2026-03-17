
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants'

import RecentSearch from './RecentSearch'
import QuestionAnswer from './QuestionAns'

function App() {
  const[question,setquestion]=useState("")
  const[result,setresult]=useState([])
  const[recenthistory,setrecenthistory]=useState(JSON.parse(localStorage.getItem('history')))
  const[selectedhistory,setselectedhistory]=useState('')
  const scrollTOAns=useRef()
  const[loader,setloader]=useState(false)
 
  
  const askquestion=async()=>{
    if(!question && !selectedhistory){
      return false;
    }

    if(question){
    if(localStorage.getItem('history')) {
      let history=JSON.parse(localStorage.getItem('history'))
      history=[question,...history]
      localStorage.setItem('history',JSON.stringify(history))
      setrecenthistory(history)
    }else{
    localStorage.setItem('history',JSON.stringify([question]))
    setrecenthistory([question])
    }
    }
    const payloaddata=question?question:selectedhistory
     const payload={
    "contents":[{
      "parts":[{"text":payloaddata}]
    }]
  }

    setloader(true)
    let response=await fetch(URL,{
      method:"POST",
      headers: {
    "Content-Type": "application/json"
  },
      body:JSON.stringify(payload)
    })
    response=await response.json()
    let datastring=response.candidates[0].content.parts[0].text;
    datastring= datastring.split("* ");
    datastring=datastring.map((items)=>items.trim());
    console.log(datastring)
    setresult([...result,{type:"q",text:question?question:selectedhistory},{type:"a",text:datastring}])
    setquestion("")
setTimeout(()=>{
      scrollTOAns.current.scrollTop=scrollTOAns.current.scrollHeight

},500)
setloader(false)

    
    
  }
 
  const isEnter=(event)=>{
    if(event.key=="Enter"){
      askquestion()
    }

  }
useEffect(()=>{
 askquestion()
},[selectedhistory])
  
     //darkmode
     const [darkmode,setDarkmode]=useState('dark')
     useEffect(()=>{
      if(darkmode=='dark'){
        document.documentElement.classList.add('dark')
      }
      else{
         document.documentElement.classList.remove('dark')
      }

     },[darkmode])
 

  return (
    <div className={darkmode=='dark'?'dark':'light'}>
   
    <div className='grid grid-cols-5 h-screen text-center'>
      <select  onChange={(event)=>{setDarkmode(event.target.value)}} className=' fixed text-white  bottom-0 p-5'>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
      <RecentSearch recenthistory={recenthistory} setrecenthistory={setrecenthistory} setselectedhistory={setselectedhistory}/>
    <div className='col-span-4 p-10 relative'>
        <h1 className='text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to via-violet-700'>Hello User, Ask me Anything</h1>
       {loader && (
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
)}


        <div  ref={scrollTOAns}className="container h-130 overflow-auto ">
         <div className='dark:text-zinc-300 text-zinc-800'>
         <ul className="p-0 m-0 list-none">
         
          {
            result.map((item,index)=>(
              <QuestionAnswer  key={index}item={item} index={index}/>


            ))
          }
          </ul>

          </div> 

        </div>
        <div className='dark:bg-zinc-800 bg-red-100  dark:text-white text-zinc-800 p-1 pr-5  w-1/2 m-auto rounded-4xl border border-zinc-700 flex h-16'>
          <input type="text" value={question} 
          onKeyDown={isEnter}
          
          onChange={(event)=>{setquestion(event.target.value)}}className='  h-full w-full p-3 outline-none' placeholder='Ask me anything'/>
          <button onClick={askquestion}>Ask</button>

        </div>

      </div>
    </div>
    </div>
  )
}

export default App
