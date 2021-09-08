import Constants from "../Constants";
import firebase from "../firebase";
const users = firebase.collection("/" + Constants.dbTable.users);

class UserService
{
    static getAll() {
        return users;
    }

    static create(email, type="seeker") {
        try{
            return users.add({email:email, type:type});
        }
        catch(e){
            console.error(e);
        }
    }
}
export default UserService;