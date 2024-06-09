import { create } from 'zustand'
import { BSON } from 'realm';
interface Props {
    name: string,
    type : number,
    image : string,
    engine : string,
    vehId : BSON.ObjectId,
    userId : BSON.ObjectId,
    setVehicle : (a : basicState)=>void
    deleteVehicles : ()=>void
}

interface basicState {
    name: string,
    type : number,
    image : string,
    engine : string,
    vehId : BSON.ObjectId,
    userId : BSON.ObjectId,
    
}

const useVehicleStore = create<Props>((set) => ({
    name: '',
    type : 0,
    image : '',
    engine : '',
    vehId : new BSON.ObjectId(),
    userId : new BSON.ObjectId(),
    setVehicle : (newState : basicState) => {
        set((state) => (newState))
    },
    deleteVehicles : ()=>{
        set((state) => ({}))
    }
}))

export default useVehicleStore;