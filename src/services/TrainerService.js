import Constants from "../Constants";
import firebase from "../firebase";
const trainers = firebase.collection("/" + Constants.dbTable.trainers);

class TrainerService
{
    static getAll() {
        return trainers;
    }

    static create(email, available=true) {
        try{
            return trainers.add({email:email, available:available});
        }
        catch(e){
            console.error(e);
        }
    }
    
    static update(id, value) {
        return trainers.doc(id).update(value);
    }

    static delete(id) {
        return trainers.doc(id).delete();
    }
}
export default TrainerService;