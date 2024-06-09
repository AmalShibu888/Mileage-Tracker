
import { create } from 'zustand'
import { BSON } from 'realm';
interface Props {
    name : string;
    nickname : string,
    email : string,
    passcode :string,
    id : BSON.ObjectId,
    setUser : (a : basicState) =>void
    setPasscode : (a : string) =>void
    setId : (a : BSON.ObjectId) =>void


}

interface basicState {
    name ?: string;
    nickname ?: string,
    email ?: string,
    passcode ?:string,
    id ?:  BSON.ObjectId,
}

const useUserStore = create<Props>((set) => ({
    name: '',
    nickname : '',
    email : '',
    passcode : '',
    id : new BSON.ObjectID,
    setUser : (newState :basicState) => {

        set((state :basicState) => (newState))
    },
    setPasscode : (passcode : string) =>{
        set((stat : basicState) =>({passcode : passcode}))
    },setId : (id : BSON.ObjectId) =>{set((state : basicState) =>({id : id}))}
}))

export default useUserStore;