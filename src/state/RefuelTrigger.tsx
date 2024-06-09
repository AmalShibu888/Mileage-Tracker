import { create } from 'zustand'
import { BSON } from 'realm';
import { RefuelInterface } from '../Database/interfaces';

interface basicState {
    refuelDatas: RefuelInterface[];
    curVehId : BSON.ObjectId;

}

interface RefuelTrigerInterface {
    refuelDatas: RefuelInterface[];
    curVehId : BSON.ObjectId;
    setRefuelState: (a: basicState) => void
    addRefuelData : (a : RefuelInterface) =>void
    removeRefuelData : (a : BSON.ObjectId)=>void
    editingRefuelData : (a : RefuelInterface) =>void
    resetRefuelState : ()=>void,
  }
const useRefuelTriggerStore = create<RefuelTrigerInterface>((set) => ({
    refuelDatas : [],
    curVehId : new BSON.ObjectId(),
    setRefuelState : (newState :basicState) => {
        set((state : basicState) => (newState))
    },
    addRefuelData : (data : RefuelInterface)=>{
        set((state : basicState)=>({...state, refuelDatas : [...state.refuelDatas , data]}))
    },
    removeRefuelData : (id : BSON.ObjectId)=>{
        set((state : basicState)=>{
            const newRefData = state.refuelDatas.filter((refData)=> !refData._id.equals(id))
            return ({...state , refuelDatas : newRefData});
        })
    },
    editingRefuelData : (refuelingData : RefuelInterface)=>{
        set((state : basicState) =>{
            let newRefData :  RefuelInterface[]  = [];
            state.refuelDatas.map((refData)=> {
                if(refData._id.equals(refuelingData._id)){
                    newRefData.push(refuelingData);
                }else{
                    newRefData.push(refData);
                }
            })

            return ({...state , refuelDatas : newRefData})
        })
    },resetRefuelState : ()=>{
        set((state : basicState)=>({curVehId : new BSON.ObjectId() , refuelDatas : []}))
    }
}))

export default useRefuelTriggerStore;