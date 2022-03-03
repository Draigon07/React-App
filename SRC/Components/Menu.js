import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "./Theme"

// const themeStyles = {
//   backgroundColor: theme ? '#333' : '#ccc',
//   color: theme ? '#ccc' : '#333',
//   padding: '2rem',
//   margin: '2rem'
// }



const Menu = ({func, changeModal}) =>{
  const theme = useContext(ThemeContext)
  const Styles = {
    backgroundColor: theme ? "peru": "#ac21d6 ",
  }

  const Btn_Styles = {
    backgroundColor: theme ? "#9b632a": "#ac41d5"
  }
  console.log(theme)
    return (
      <header style={Styles}>
        <nav className="menu">
          <ul>
            <li>
              <Link to="/" className="link">Inicio</Link>
            </li>
            <li>
              <Link  to="/userList" className="link">User List</Link>
              
            </li>
            <li>
              <button 
              onClick={changeModal} 
              style={{backgroundColor: 'transparent', border: 'none', color: 'white', fontSize: '18px', fontFamily:'san-serif'}}
              >
                   Contact
              </button>
            </li>
            <li>
              <button className='change_theme' onClick={func} style={Btn_Styles}>
                  Change Theme
              </button>
            </li>
          </ul>
        </nav>
      </header>
    )
}


export default Menu