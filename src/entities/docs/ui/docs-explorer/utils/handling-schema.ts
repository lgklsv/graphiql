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
        arrayTypes.push({
          name: { title: key.toLowerCase() },
          return: key,
          isLastType: false,
        });
      });
      return arrayTypes;
    }

    arrayTypes = getType({
      jsonGraphQL: jsonGraphQL.properties as Properties,
      required: jsonGraphQL.required as string[],
      clickedData: target,
    });
    return arrayTypes;
  }

  arrayTypes = getType({
    jsonGraphQL: jsonGraphQL as Properties,
    clickedData: target,
  });
  return arrayTypes;
};
