import { BSON } from "realm";
import { RefuelInterface } from "../Database/interfaces";
import { create } from "zustand";

interface curRefuelingInterface {
    _id :  BSON.ObjectId,
    date :  Date,
    fuelConsumed :number ,
    odometerStart : number,
    odometerEnd : number , 
    vehId : BSON.ObjectId,
    userId : BSON.ObjectId,
    price : number ,
    curDate :  Date,
    curVehId :  BSON.ObjectId,
    setCurRefuelState: (a: RefuelInterface) => void
    resetCurRefuelState : ()=>void
  }
const useCurRefuelingStore = create<curRefuelingInterface>((set) => ({
    _id : new BSON.ObjectID,
    date : new Date(),
    fuelConsumed : 0 ,
    odometerStart : -1 ,
     odometerEnd : -1 , 
    price : -1 ,
    vehId : new BSON.ObjectId,
    userId :new BSON.ObjectId,
    curDate : new Date(),
    curVehId : new BSON.ObjectId(),
    setCurRefuelState : (newState :RefuelInterface) => {
        set((state : RefuelInterface) => (newState))
    },
    resetCurRefuelState : () =>{
        set(()=>({}))
    }
    
}))

export default useCurRefuelingStore;