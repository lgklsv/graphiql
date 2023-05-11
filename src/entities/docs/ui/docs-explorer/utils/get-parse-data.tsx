import { getArguments } from './get-arguments';
import { FIELD } from '../const/field';
import { getReturn } from './get-return';
import { isAlreadyRequired, isRequired } from './is-required';

interface GetTypeProps {
  jsonGraphQL: Properties;
  required?: string[];
  clickedData?: string;
}

export const getParseData = (props: GetTypeProps): ParseSchemaData[] => {
  const { jsonGraphQL, required, clickedData } = props;

  const arrayTypes: ParseSchemaData[] = [];

  let parseData: ParseSchemaData = {
    name: null,
    arguments: null,
    return: null,
    type: null,
    isLastType: false,
  };

  // last type render
  if (FIELD.TITLE in jsonGraphQL) {
    parseData.name = {
      title: 'scalar',
      description: (jsonGraphQL.description as string) || null,
    };

    parseData.return = jsonGraphQL.title as string;
    parseData.isLastType = true;

    arrayTypes.push(parseData);
    return arrayTypes;
  }

  // enum render
  if (FIELD.ANY in jsonGraphQL) {
    const arrayEnum = jsonGraphQL[FIELD.ANY] as IAnyOf[];

    if ('enum' in arrayEnum[0]) {
      parseData.name = {
        title: 'enum',
        description: (jsonGraphQL.description as string) || null,
      };
      parseData.isLastType = true;
      parseData.return = clickedData || null;
    }

    const enumData = { enum: [] };

    arrayEnum.forEach((item) => {
      const value =
        item.enum?.length && item.enum[0] === item.title
          ? null
          : item.enum?.[0];

      (enumData.enum as EnumParseData[]).push({ key: item.title, value });
    });

    parseData.type = enumData;

    arrayTypes.push(parseData);
    return arrayTypes;
  }

  Object.entries(jsonGraphQL).forEach(([key, value]) => {
    parseData = {
      name: null,
      arguments: null,
      return: null,
      type: null,
      isLastType: false,
    };

    const Required = isRequired(key, required);

    if (key === FIELD.ARGUMENTS || key === FIELD.RETURN) {
      const arrayArguments = getArguments(value as Arguments);
      const returnDataAnyOf = getReturn(value as Return);

      parseData.name = clickedData ? { title: clickedData } : null;
      parseData.arguments = arrayArguments.length ? arrayArguments : null;
      parseData.return = returnDataAnyOf || null;

      arrayTypes.push(parseData);

      return arrayTypes;
    }

    parseData.name = {
      title: key,
      description: (value?.description as string) || null,
    };

    // check has properties in value
    if (FIELD.PROPERTIES in (value as Properties)) {
      Object.entries(value?.properties as Properties).forEach(
        ([keyArgs, valueArgs]) => {
          if (keyArgs === FIELD.ARGUMENTS) {
            const arrayArguments = getArguments(valueArgs as Arguments);

            parseData = {
              ...parseData,
              ...{ arguments: [...arrayArguments] },
            };
          }

          if (keyArgs === FIELD.RETURN) {
            const returnDataAnyOf = getReturn(valueArgs as Return);
            const typeReturnData = isAlreadyRequired(returnDataAnyOf, Required);

            parseData = {
              ...parseData,
              ...{ return: typeReturnData },
            };
          }
        }
      );

      arrayTypes.push(parseData);
      return arrayTypes;
    }

    // if prop not in value - return type data
    const returnDataAnyOf = getReturn(value as Return);
    const typeReturnData = isAlreadyRequired(returnDataAnyOf, Required);
    parseData.return = typeReturnData || null;

    arrayTypes.push(parseData);
    return arrayTypes;
  });

  return arrayTypes;
};
