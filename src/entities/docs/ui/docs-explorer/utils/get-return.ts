import { sliceData } from './slice-data';

export const getReturn = (object: Return): string => {
  let returnData = '';

  if (Object.keys(object).includes('type')) {
    if (object.type === 'array') {
      if (Object.keys(object.items as ItemsReturn).includes('anyOf')) {
        const array = (object.items as ItemsReturn).anyOf;

        array.forEach((prop) => {
          if (prop.$ref) {
            returnData = `[${sliceData(prop.$ref as string)}]`;
          }
        });

        return returnData;
      }

      returnData = `[${sliceData((object.items as Ref).$ref as string)}!]!`;
    }
    return returnData;
  }

  if (Object.keys(object).includes('$ref')) {
    returnData = sliceData(object.$ref as string);
    // TODO: логика не null возвращаемых значений
  }

  return returnData;
};
