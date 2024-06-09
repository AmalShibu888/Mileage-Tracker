import { RefuelInterface, UserInterface } from "../Database/interfaces";

export type StackParamList = {
    splash: undefined;
    signUp: undefined;
    createAccount : undefined;
    setPasscode: undefined;
    tabNavigation: undefined;
    login: undefined;
    checkPasscodeContainer:   undefined ;
    splash2:   undefined ;
    checkPasscode:   undefined ;


    
  };

  export type BottomTabParamList = {
 
    Refueling: {screen : 'refuelingInfo'} |{screen : 'refuelingForm'} | undefined;
    
    Performance: undefined;
    Home: undefined;

    Vehicles:{screen : 'addVehiclesForm'} | undefined;

   
   };

   export type drawerParamList = {
    profile : undefined

   
   };

   export type refuelingStackParamList = {
 
    refuelingInfo:  undefined;
    
    refuelingForm: undefined;
    editingRefuelingData: undefined;

    editingRefuelingForm:undefined  |{info : RefuelInterface};
  };

  export type vehicleStackParamList = {
 
    vehiclesInfo:  undefined;
    
    addVehiclesForm: undefined;
    congratz: {image : string , name : string} |undefined;

   
   };
