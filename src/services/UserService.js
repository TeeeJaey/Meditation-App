  
import firebase from "../firebase";
const users = firebase.ref("/users");

class UserService
{
    static getAll() {
        return users;
    }

    static create(email, type="seeker") {
        try{
            return users.push({email:email, type:type});
        }
        catch(e){
            console.error(e);
        }
    }
}
export default UserService;