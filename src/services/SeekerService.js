  
import firebase from "../firebase";
const seekers = firebase.ref("/seekers");

class SeekerService
{
    static getAll() {
        return seekers;
    }

    static create(email, available=true) {
        try{
            return seekers.push({email:email, available:available});
        }
        catch(e){
            console.error(e);
        }
    }
}
export default SeekerService;