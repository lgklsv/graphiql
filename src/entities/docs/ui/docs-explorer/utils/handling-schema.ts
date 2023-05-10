import { JSONSchema6 } from 'json-schema';

import { FIELD } from '../const/field';
import { getType } from './get-type';

export const handlingSchema = (
  jsonGraphQL: IJson | JSONSchema6
): ReturnData[] => {
  let arrayTypes: ReturnData[] = [];

  // query.properties
  if (FIELD.PROPERTIES in jsonGraphQL) {
    if (Object.keys((jsonGraphQL as IJson).properties).includes('Query')) {
      Object.entries((jsonGraphQL as IJson).properties).forEach(([key]) => {
        arrayTypes.push({ name: { title: key.toLowerCase() }, return: key });
      });
      return arrayTypes;
    }

    arrayTypes = getType(
      jsonGraphQL.properties as Properties,
      jsonGraphQL.required as string[]
    );
    return arrayTypes;
  }

  arrayTypes = getType(jsonGraphQL as Properties);
  return arrayTypes;
};
