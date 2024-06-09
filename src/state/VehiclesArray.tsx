import { create } from 'zustand'
import { VehicleInterface } from '../Database/interfaces'

interface Props {
    VehiclesArray : VehicleInterface[]
    setVehicleState : (a:basicState) => void
    addVehicleState : (a:VehicleInterface) => void
    deleteVehiclesState : () => void

}
interface basicState {
    VehiclesArray : VehicleInterface[]
}

const useVehicleArrayStore = create<Props>((set) => ({
    VehiclesArray : [],
    setVehicleState : (newState : basicState) => {
        set((state) => (newState))
    },
    addVehicleState : (vehicle : VehicleInterface) => {
        set((state) => ({VehiclesArray : [...state.VehiclesArray , vehicle]}))
    },
    deleteVehiclesState : ()=>{
        set((state) =>  ({VehiclesArray : []}))   
    }
}))

export default useVehicleArrayStore;