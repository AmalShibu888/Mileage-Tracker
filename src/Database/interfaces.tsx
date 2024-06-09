import { BSON } from 'realm';
export interface UserInterface {
  _id: BSON.ObjectId;
  name: string;
  email: string;
  nickname: string;
  passcode: string;
  color : string;
  active:boolean
}
export interface VehicleInterface {
    userId: BSON.ObjectId;
    _id: BSON.ObjectId;
    name: string;
    type: number;
    engine: string ;
    image: string;
}
export interface RefuelInterface {
    _id: BSON.ObjectId;
      vehId : BSON.ObjectId,
      userId : BSON.ObjectId,
      date: Date,
      odometerStart : number,
      odometerEnd : number,
      price : number,
      fuelConsumed : number,
      curDate : Date
}
export interface AuthenticationInterface {
  id: BSON.ObjectId;
  userId: BSON.ObjectId;
  name: string;
  nickName: string;
  passCode: string;
  email: string;
}