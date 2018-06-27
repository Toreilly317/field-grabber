import checkType from '../utils/checkType';
import { isObject, isString } from '../utils/checkType';

export default class FieldGrabber {
  constructor(reqObject, wantedFields, obj = {}) {
    this.reqObject = reqObject;
    this.wantedFields = wantedFields;
    this.fieldsObj = obj;
    this.checkType = checkType;
    return this.grabAll()(this);
  }

  getValue = field => {
    if (this.reqObject.hasOwnProperty(field)) {
      return this.reqObject[field];
    }
  };

  handleStringField = (field, obj) => {
    obj[field] = this.getValue(field);
  };

  handleAllStringArray = (arr, obj) => {
    const [name, value] = arr;
    obj[name] = this.getValue(value);
  };

  handleTwoParamArray = (arr, obj) => {
    if (arr.every(isString)) {
      this.handleAllStringArray(arr, obj);
    }
  };

  handleArrayWithCallback = (arr, obj) => {
    const [name, callback] = arr;
    obj[name] = callback(this.getValue(name));
  };

  handleThreeParamArray = (arr, obj) => {
    const [name, field, callback] = arr;
    obj[name] = callback(this.getValue(field));
  };

  handleArrayField = (arr = [], obj) => {
    switch (arr.length) {
      case 2:
        this.handleTwoParamArray(arr, obj);
        break;
      case 3:
        this.handleThreeParamArray(arr, obj);
        break;
    }

    return obj;
  };

  handleEmbeddedFields = (field, obj) => {
    console.log(field);
    // Object.keys(embeddedFields).forEach(key => {
    //   const wantedField = embeddedFields[key];
    // });
    //return obj;
  };

  handleObjectField = (field, obj) => {
    const { name, wantedFields } = field;
    let objectToAttachTo = (obj[name] = {});

    wantedFields.forEach(field => {
      if (!isObject(field)) {
        this.grab(field, objectToAttachTo);
      } else if (field.hasOwnProperty('name')) {
        console.log(field);
        objectToAttachTo[name] = this.grab(field, objectToAttachTo);
      }
    });
  };

  //give a field
  handleFieldBasedOnType = (field, obj) => {
    switch (checkType(field)) {
      case 'string': {
        this.handleStringField(field, obj);
        break;
      }
      case 'array': {
        this.handleArrayField(field, obj);
        break;
      }
      case 'object': {
        this.handleObjectField(field, obj);
        break;
      }
      default: {
        throw new Error(`checkType failed with ${field}`);
      }
    }
  };

  //@field - the field you are looking for
  grab = (field, obj = {}) => {
    this.handleFieldBasedOnType(field, obj);
  };

  grabAll = (wantedFields = this.wantedFields, obj = this.fieldsObj) => {
    wantedFields.forEach(field => {
      this.grab(field, obj);
    });

    return obj;
  };
}
