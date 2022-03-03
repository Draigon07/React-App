
import {useContext, useState} from 'react'
import Modal from "./Modal_Contact"
import ThemeContext from './Theme';

export function RandomImg ( { id } ) {
    const randomId = Math.floor( Math.random() * 100 );
    return (
        id ? (
            <img
              src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
              alt="RandomImg" />
        ) : (
             <img
              src={`https://randomuser.me/api/portraits/men/${randomId}.jpg`}
              alt="RandomImg" />    
        )

    )
}


function UserCard ( { arr } ) {
    const theme = useContext(ThemeContext)
    const [showDetails, setShowDetails] = useState(false)
    const [currentObj, setCurrentObj] = useState({})
    const btnStyles = {
        backgroundColor: theme ? "peru": "rgb(172, 33, 214)",
        color: "white"
    }
    console.log(theme)
    function toggleDetails(){
        setShowDetails(show => !show)
    }

    function Details({obj}){
      return(
         
          <Modal>
                      {obj.address && obj.company ? (
                          <>
                              <button onClick={toggleDetails}  className="x"> X</button>
                              <h1>Details</h1>
                              <h2>{obj.name}</h2>
                              <picture className="details_figure">
                                 <RandomImg id={obj.id} />
                              </picture>
                              <h2>{` Address: ${obj.address.city} -  ${obj.address.street}`}</h2>
                              <h2>Email: {obj.email.toLowerCase()}</h2>
                              <h2> Phone:{obj.phone}</h2>
                              <h2> Company: {obj.company.name}</h2>

                          </>
                      ):(
                          <>
                          <button onClick={toggleDetails}  className="x"> X</button>
                        <h2>Not details</h2>
                          </>
                      )}
          </Modal>
      )
    }
    const Map = arr.map( el => {
        return (
          
            <div className="user" key={el.id}>
                <h2> name: { el.name }</h2>
                <h2>email: { el.email.toLowerCase()}</h2>
                <h2>user: { el.username || el.user }</h2>
                <picture>
                <RandomImg id={el.id} />
                </picture>
                <button style={btnStyles} onClick={()=>{
                   setCurrentObj(el)
                   toggleDetails()
                } } className="btn btn-details">Details</button> 
            </div>
        )
    } )
    
    return (
       <>
        {Map}
        {showDetails ? (
           <Details obj={currentObj} />
        ): null }
        
       </>
          
      
    )
}

export default UserCard