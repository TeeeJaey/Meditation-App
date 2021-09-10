import Constants from "../Constants";
import firebase from "../firebase";
const requests = firebase.collection("/" + Constants.dbTable.requests);

class RequestService
{
    static getAll() {
        return requests;
    }

    static create(sender, reciever, status=Constants.requestStatus.pending) {
        return requests.add({sender:sender, reciever:reciever, status:status});
    }
            
    static update(id, value) {
        return requests.doc(id).update(value);
    }
        
    static delete(id) {
        return requests.doc(id).delete();
    }

    static clearRequests(email) {
        return requests.get().then(requestList => {
            requestList.forEach(requestRef => {
                const id = requestRef.id;
                const request = requestRef.data();
                if(request.sender === email)
                    RequestService.delete(id);
                if(request.reciever === email)
                    RequestService.delete(id);
            });
          });
    }
}

export default RequestService;
