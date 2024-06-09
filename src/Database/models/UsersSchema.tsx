import Realm from "realm";
import {BSON} from 'realm';


export class Users extends Realm.Object<Users> {
  _id!: BSON.ObjectId;
  name!: string;
  nickName! : string;
  email! : string;
  static schema: Realm.ObjectSchema = {
    name: 'Users',
    properties: {
      _id: 'objectId',
      name: {type: 'string', indexed: 'full-text'},
      nickname : 'string',
      email : 'string',
      passcode : 'string',
      active : 'bool',
      color : 'string'
    },
    primaryKey: '_id',
  };
}
