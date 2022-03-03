

class DataBase{
    constructor(db){
        this.db = db;
    }

    saveOnDb({key,val}){
        this.db.setItem(key, JSON.stringify(val))
    }

    validationDb({inputName, inputUser}){
        const justNames = [];
        const justUsers = [];
        if(inputName == "" || inputName == undefined && inputUser != undefined || inputUser != "" ){
            return {name: false, user: false }
        }
        else if(inputName == "" || inputName == undefined ){
          return {name: false,user:true}
        }else if(inputUser != undefined || inputUser != ""){
            return {user: false, name: true}
        }else{
            var keys = Object.keys(this.db)
            for(let key of keys){
              var users = JSON.parse(this.db.getItem(key))
              justNames.push(users.name.toLowerCase())
              justUsers.push(users.user.toLowercase())
            }
        }
        return justNames.includes(inputName.toLowerCase()) ? true: false
    }



}


export default DataBase