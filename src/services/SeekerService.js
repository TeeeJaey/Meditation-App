import Constants from "../Constants";
import firebase from "../firebase";
const seekers = firebase.collection("/" + Constants.dbTable.seekers);

class SeekerService
{
    static getAll() {
        return seekers;
    }

    static create(email, available=true) {
        try{
            return seekers.add({email:email, available:available});
        }
        catch(e){
            console.error(e);
        }
    }
}
export default SeekerService;