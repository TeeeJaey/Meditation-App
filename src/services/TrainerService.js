import Constants from "../Constants";
import firebase from "../firebase";
const trainers = firebase.collection("/" + Constants.dbTable.trainers);

class TrainerService
{
    static getAll() {
        return trainers;
    }

    static create(email, available=false) {
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
    
    static setAvailable(email, available=false) {
        return trainers.get().then(dbTrainerList => {
            let trainerID = "";
            dbTrainerList.forEach(dbTrainerRef => {
                const dbTrainer = dbTrainerRef.data();
                if(dbTrainer && dbTrainer.email === email) 
                {
                    trainerID = dbTrainerRef.id;
                    if(trainerID)
                        TrainerService.update(trainerID, {available:available});
                }
            });
        });
    }
}
export default TrainerService;