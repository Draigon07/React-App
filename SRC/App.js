import React, { useState, useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UserCard from "./Components/UserList";
import Menu from "./Components/Menu";
import Main from "./Images/Main.svg";
import ThemeContext from "./Components/Theme";
import Modal from "./Components/Modal_Contact"
import Contact from "./Images/Contact.svg";
import DataBase from "./Components/DbEvents"
import UserTotalTable from "./Components/UserTableTotal"

//Solution useReff instead of useState
function MainInterface({db,func}){
  const theme = useContext(ThemeContext)
  const [repeated,setRepeaded] = useState(false) 
  const inputRef = useRef("")
  const save = new DataBase(db);
  const random = Math.floor(Math.random() * 100);
  const userData = {id: random, name:"", email: "", user: ""};
  const validation = save.validationDb({inputName:userData.name, inputUser:userData.user})
  const Styles = {
    backgroundColor: theme ? "peru": "#8e1db1"
  }
  const inputStyles = {
    backgroundColor: repeated ? "#c91717": null,
    color: repeated ? "white": null,
    placeholder: repeated ? "white": null
  }
  console.log(theme)
  return(
    <div className="userInterface">
              <h1>User Data Base</h1>
              <picture className="main-img">
                <img src={Main} alt="Store" />
              </picture>
              <p>
                Welcome to Users Database, here we store data from our users,
                for later use.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam est explicabo officia ipsum quia esse alias corrupti!
                Nisi dignissimos distinctio quam reiciendis tempora aliquam
                obcaecati praesentium corporis quia voluptates, modi dolorum
                accusamus aperiam odio.
 
              </p>

              <form className="add_user" style={Styles}>
                 <h2>Add new User</h2>
                 <input ref={inputRef} type="text" onChange={
                   (e)=> {

                     const inputValue = e.target.value.trim();
                     userData.name = inputValue
                     inputValue.length > 0 ? (
                       validation ? setRepeaded(true): setRepeaded(false),
                       console.log(userData.name)
                     ):(
                        null
                     )
                   } 
                  }  
                   style={inputStyles} placeholder="Name" />

                 <input type="email" onChange={(e)=> {
                   userData.email = e.target.value;
                } } placeholder="Email"/>
                 <input type="text" onChange={(e)=> {
                  userData.email =  e.target.value;
                   } } placeholder="User"/>
                 <button style={{backgroundColor: theme? 'rgb(155, 99, 42)': null, border: 'rgb(155, 99, 42)'}} onClick={
                   (e)=>{
                     e.preventDefault()
                   
                     if(!validation) {
                      save.saveOnDb({key: userData.id, val: userData})
                      func({obj: userData})
                      inputRef.current.value = "";
                     }else if(validation.name == false){
                       alert("The name")
                     }else if(validation.user == false){
                       alert("The user")
                     }else{
                      setRepeaded(true)
                     }
                    }}>
                      Add
                  </button>
                  <h2 className="warning">{repeated ? "Nombre ya existente": null}</h2>
              </form>
    </div>
            
  )
}



function App() {
  const db = window.localStorage;
  const save = new DataBase(db);
  const [darkTheme, changeTheme] = useState(false)
  const [openContact,setOpenContact] = useState(false)
  const [newUsers, setNewUser] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [onSearch,setOnSearch] = useState(false)
  const [currentName, setCurrentName] = useState("")




 const toggleTheme = ()=>{
   changeTheme(theme => !theme)
 }

 const toggleModal = ()=>{
   setOpenContact(open => !open)
   console.log(openContact)
 } 

 function saveForArr({arr}){
  arr.map(el =>{
    save.saveOnDb({key: el.id, val: el})
  })
 }

  const getUser = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await res.json();
      saveForArr({arr: json})
      setNewUser(json)
    } catch (e) {
      console.error(e);
    }
  };

  console.log(currentName)



  function setUser({obj}){
       setNewUser(obj);
       
  }

  function usersFromDb(db){
    var keys = Object.keys(db)
    var store = []
    for(let key of keys){
      var user = JSON.parse(db.getItem(key))
      store.push(user)
    }
    setAllUsers(store)
  }
 

  useEffect(()=>{
    usersFromDb(db)
  },[newUsers])

  useEffect(()=>{
    getUser()
  },[])

const setName = (e)=>{
  setCurrentName(e)
}

const setSearch = (val)=>{
     setOnSearch(val)
}

  return (
  <ThemeContext.Provider value={darkTheme}>
    <div>
      <Router>
        <Menu func={toggleTheme} changeModal={toggleModal}  />
        <Switch>
          <Route path="/userlist">
          <UserTotalTable allUsersArr={allUsers} currentName={currentName} setName={setName} search={onSearch} setOnSearch={setSearch} />
          </Route>
       
          <Route path="/">
            <MainInterface db={db} func={setUser}/>
          </Route>
        </Switch>
      </Router>
    </div>
    {
      openContact ? (
        <Modal >
          <button onClick={toggleModal} className="x"> X</button>
          <h1>Contact us</h1>
          <picture className="picture_contact">
             <img src={Contact} alt="Contact_img" />
          </picture>
        </Modal>
      ):null
    }
      </ThemeContext.Provider>

  );
}

ReactDOM.render(<App />, document.getElementById("root"));


