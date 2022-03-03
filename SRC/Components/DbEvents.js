

class DataBase{
    constructor(db){
        this.db = db;
    }

    saveOnDb({key,val}){
        this.db.setItem(key, JSON.stringify(val))
    }

    validationDb({input}){
        const justNames = []
        var keys = Object.keys(this.db)
        for(let key of keys){
          var user = JSON.parse(this.db.getItem(key))
          justNames.push(user.name.toLowerCase())
        }
        return justNames.includes(input.toLowerCase()) ? true: false
    }



}


export default DataBase