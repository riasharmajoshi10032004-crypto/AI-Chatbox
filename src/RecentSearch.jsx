function RecentSearch({recenthistory,setrecenthistory,setselectedhistory}){
     const clearhistory=()=>{
    localStorage.clear()
    setrecenthistory([])
  }
    return(
        <>
              <div className='col-span-1  dark:bg-zinc-800 bg-red-100 pt-3'>
        <h1 className= 'dark:text-white  text-zinc-800 text-xl   flex justify-center'><span>Recent History</span>
          <button  onClick={clearhistory} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
        </h1>
      <ul className='text-left overflow-auto mt-2 '>
        {
        recenthistory && recenthistory.map((item,index)=>(
          <li onClick={()=>{setselectedhistory(item)}} className="p-1 pl-5 px-5 truncate dark:text-zinc-400 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-red-200 hover:text-zinc-800 "key={index}>{item}</li>

        ))
      }
      </ul>

      </div>

        </>
    )
}
export default RecentSearch;