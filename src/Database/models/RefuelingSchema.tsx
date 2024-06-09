import Realm from "realm";
import {BSON} from 'realm';


export class Refueling extends Realm.Object<Refueling> {
  _id!: BSON.ObjectId;
  static schema: Realm.ObjectSchema = {
    name: 'Refueling',
    properties: {
      _id: 'objectId',
      vehId : 'objectId',
      userId : 'objectId',
      date: 'date',
      odometerStart : 'int',
      odometerEnd : 'int',
      price : 'double',
      fuelConsumed : 'double',
      curDate : 'date'
    },
    primaryKey: '_id',
  };
}
