import { getArguments } from './get-arguments';
import { FIELD } from '../const/field';
import { getReturn } from './get-return';
import { isAlreadyRequired, isRequired } from './is-required';

interface GetTypeProps {
  jsonGraphQL: Properties;
  required?: string[];
  clickedData?: string;
}

export const getType = (props: GetTypeProps): ReturnData[] => {
  const { jsonGraphQL, required, clickedData } = props;

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
      title: 'scalar',
      description: jsonGraphQL.description as string,
    };

    returnData.return = jsonGraphQL.title as string;

    arrayTypes.push(returnData);
    return arrayTypes;
  }

  // enum render
  if (FIELD.ANY in jsonGraphQL) {
    const arrayEnum = jsonGraphQL[FIELD.ANY] as IAnyOf[];

    if ('enum' in arrayEnum[0]) {
      returnData.name = {
        title: 'enum',
        description: (jsonGraphQL.description as string) || null,
      };

      returnData.return = clickedData || null;
    }

    const enumData = { enum: [] };

    arrayEnum.forEach((item) => {
      const value =
        item.enum?.length && item.enum[0] === item.title
          ? null
          : item.enum?.[0];

      (enumData.enum as EnumReturnData[]).push({ key: item.title, value });
    });

    returnData.type = enumData;

    arrayTypes.push(returnData);
    return arrayTypes;
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
