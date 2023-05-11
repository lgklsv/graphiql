import { JSONSchema6 } from 'json-schema';

import { FIELD } from '../const/field';
import { getParseData } from './parseData/get-parse-data';

export const handlingSchema = (
  jsonGraphQL: IJson | JSONSchema6,
  target?: string
): ParseSchemaData[] => {
  let arrayParseTypes: ParseSchemaData[] = [];

  if (FIELD.PROPERTIES in jsonGraphQL) {
    if (Object.keys((jsonGraphQL as IJson).properties).includes('Query')) {
      Object.entries((jsonGraphQL as IJson).properties).forEach(([key]) => {
        arrayParseTypes.push({
          name: { title: key.toLowerCase() },
          return: key,
          isLastType: false,
        });
      });
      return arrayParseTypes;
    }

    arrayParseTypes = getParseData({
      jsonGraphQL: jsonGraphQL.properties as Properties,
      required: jsonGraphQL.required as string[],
      clickedData: target,
    });
    return arrayParseTypes;
  }

  arrayParseTypes = getParseData({
    jsonGraphQL: jsonGraphQL as Properties,
    clickedData: target,
  });

  return arrayParseTypes;
};
