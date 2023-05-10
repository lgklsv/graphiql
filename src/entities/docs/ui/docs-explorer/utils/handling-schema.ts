import { JSONSchema6 } from 'json-schema';

import { FIELD } from '../const/field';
import { getType } from './get-type';

export const handlingSchema = (
  jsonGraphQL: IJson | JSONSchema6,
  target?: string
): ReturnData[] => {
  // TODO: обработь ENUMS
  // обработать конечные типы, не передаются ключи users_aggregate

  let arrayTypes: ReturnData[] = [];
  console.log(jsonGraphQL);
  // TODO: check data on DESCRIPTIONS in fields
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
