import { getArguments } from './get-arguments';
import { FIELD } from '../const/field';
import { getReturn } from './get-return';
import { isAlreadyRequired, isRequired } from './is-required';

export const getType = (
  jsonGraphQL: Properties,
  required?: string[],
  clickedData?: string
): ReturnData[] => {
  const arrayTypes: ReturnData[] = [];

  let returnData: ReturnData = {
    name: null,
    arguments: null,
    return: null,
    type: null,
  };

  // last type render
  if (FIELD.TITLE in jsonGraphQL) {
    returnData.name = {
      title: 'scalar' as string,
      description: jsonGraphQL.description as string,
    };
    returnData.return = jsonGraphQL.title as string;

    arrayTypes.push(returnData);

    return arrayTypes;
  }

  if (FIELD.ANY in jsonGraphQL) {
    console.log(jsonGraphQL);
    console.log('ENUUUUUUUMMMMMMM');

    // returnData.name = {
    //   title: 'scalar' as string,
    //   description: jsonGraphQL.description as string,
    // };
    // returnData.return = jsonGraphQL.title as string;

    // arrayTypes.push(returnData);

    // return arrayTypes;
  }

  Object.entries(jsonGraphQL).forEach(([key, value]) => {
    returnData = {
      name: null,
      arguments: null,
      return: null,
      type: null,
    };

    const Required = isRequired(key, required);

    if (key === FIELD.ARGUMENTS || key === FIELD.RETURN) {
      const arrayArguments = getArguments(value as Arguments);
      const returnDataAnyOf = getReturn(value as Return);

      returnData.name = clickedData ? { title: clickedData } : null;
      returnData.arguments = arrayArguments.length ? arrayArguments : null;
      returnData.return = returnDataAnyOf && null;

      arrayTypes.push(returnData);

      return arrayTypes;
    }

    returnData.name = { title: key }; // name of fields in Query

    Object.entries(value?.properties as Properties).forEach(
      ([keyArgs, valueArgs]) => {
        if (keyArgs === FIELD.ARGUMENTS) {
          const arrayArguments = getArguments(valueArgs as Arguments);

          returnData = {
            ...returnData,
            ...{ arguments: [...arrayArguments] },
          };
        }

        if (keyArgs === FIELD.RETURN) {
          const returnDataAnyOf = getReturn(valueArgs as Return);
          const typeReturnData = isAlreadyRequired(returnDataAnyOf, Required);

          returnData = {
            ...returnData,
            ...{ return: typeReturnData },
          };
        }
      }
    );

    arrayTypes.push(returnData);
    return arrayTypes;
  });

  return arrayTypes;
};
