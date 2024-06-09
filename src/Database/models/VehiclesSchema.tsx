import Realm from "realm";
import {BSON} from 'realm';

export class Vehicles extends Realm.Object<Vehicles> {
  _id!: BSON.ObjectId;
  name!: string;
  type ?: number;
  engine! : string;
  userId! : string;
  image! : string;
  static schema: Realm.ObjectSchema = {
    name: 'Vehicles',
    properties: {
      _id: 'objectId',
      name: {type: 'string', indexed: 'full-text'},
      type : 'int?',
      userId : 'objectId',
      engine : 'string',
      image : 'string'
    },
    primaryKey: '_id',
  };
}
