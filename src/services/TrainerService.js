import firebase from "../firebase";
const trainers = firebase.ref("/trainers");

class TrainerService
{
    static getAll() {
        return trainers;
    }

    static create(email, available=true) {
        try{
            return trainers.push({email:email, available:available});
        }
        catch(e){
            console.error(e);
        }
    }
}
export default TrainerService;