import { useEffect } from "react"
import UserCard from "./UserList"



const Filter = ({arr,input})=>{
    const filter = arr.filter(el => el.name.toLowerCase().includes(input.toLowerCase()))
    console.log(filter)
    return(
      <>
      {filter.length > 0 ? (
        <UserCard arr={filter} />
      ):(
        <h1 style={{textAlign: 'center'}}>Not results</h1>
      )}
      </>
    )
  }
  
  export default function UserTotalTable({allUsersArr,currentName,setName, search, setOnSearch}){
    console.log(currentName)
    
    useEffect(()=>{
        setOnSearch(false)
    },[])

     return(
       <div className="userTable">
         <input  type="text" className="search" placeholder="Search User"
         onFocus={e => console.log(e)}
         onChange={(e) =>{
             e.target.value.length> 0 ?(
              setName(e.target.value),
              setOnSearch(true),
              console.log('Hola')
           ):(
             setOnSearch(false)
           )
         }}
         />
         {search?(
           <Filter arr={allUsersArr} input={currentName} />
           ):(
             <UserCard arr={allUsersArr} />
         )}
       </div>
     )
   }