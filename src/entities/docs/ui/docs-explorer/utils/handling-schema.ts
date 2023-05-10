import { JSONSchema6, JSONSchema6Definition } from 'json-schema';

import { FIELD } from '../const/field';
import { getType } from './get-type';

export const handlingSchema = (
  jsonGraphQL: IJson | JSONSchema6,
  clickedData?: string
): ReturnData[] => {
  // TODO: проверять на входе, объект ли это

  let arrayTypes: ReturnData[] = [];

  // let returnData: ReturnData = {
  //   name: null,
  //   arguments: null,
  //   return: null,
  //   type: null,
  // };

  // first render - Query
  // if (Object.keys(jsonGraphQL).includes('Query')) {
  //   Object.entries(jsonGraphQL).forEach(([key]) => {
  //     arrayTypes.push({ name: { title: key.toLowerCase() }, return: key });
  //   });
  //   return arrayTypes;
  // }

  // query.properties
  if (FIELD.PROPERTIES in jsonGraphQL) {
    if (Object.keys((jsonGraphQL as IJson).properties).includes('Query')) {
      Object.entries((jsonGraphQL as IJson).properties).forEach(([key]) => {
        arrayTypes.push({ name: { title: key.toLowerCase() }, return: key });
      });
      return arrayTypes;
    }

    // Object.entries(jsonGraphQL.properties as Properties).forEach(
    //   ([key, value]) => {
    //     returnData = {
    //       name: null,
    //       arguments: null,
    //       return: null,
    //       type: null,
    //     };

    //     if (key === FIELD.ARGUMENTS || key === FIELD.RETURN) {
    //       const arrayArguments = getArguments(value as Arguments);
    //       const returnDataAnyOf = getReturn(value as Return);

    //       returnData.name = clickedData ? { title: clickedData } : null;
    //       returnData.arguments = arrayArguments.length ? arrayArguments : null;
    //       returnData.return = returnDataAnyOf && null;

    //       arrayTypes.push(returnData);

    //       // TODO: нужно передавать объект клика!
    //       return;
    //     }

    //     returnData.name = { title: key }; // name of fields in Query

    //     Object.entries(value?.properties as Properties).forEach(
    //       ([keyArgs, valueArgs]) => {
    //         if (keyArgs === FIELD.ARGUMENTS) {
    //           const arrayArguments = getArguments(valueArgs as Arguments);

    //           returnData = {
    //             ...returnData,
    //             ...{ arguments: [...arrayArguments] },
    //           };
    //         }

    //         if (keyArgs === FIELD.RETURN) {
    //           const returnDataAnyOf = getReturn(valueArgs as Return);

    //           returnData = {
    //             ...returnData,
    //             ...{ return: returnDataAnyOf },
    //           };
    //         }
    //       }
    //     );

    //     arrayTypes.push(returnData);
    //   }
    // );

    console.log(' ПРОВЕРКУ мы приняли данные здесь!!!!', jsonGraphQL);

    // console.log(jsonGraphQL.required);
    arrayTypes = getType(
      jsonGraphQL.properties as Properties,
      jsonGraphQL.required as string[]
    );
    return arrayTypes;
  }

  // check type

  // if (FIELD.DEFINITIONS in jsonGraphQL) {
  //   arrayTypes = getType(jsonGraphQL.definitions as Properties);
  //   return arrayTypes;
  //   // Object.entries(jsonGraphQL).forEach(([key, value]) => {
  //   //   returnData = {
  //   //     name: null,
  //   //     arguments: null,
  //   //     return: null,
  //   //     type: null,
  //   //   };
  //   //   // Check Boolean, Float,ID ,Int,String

  //   //   if ((value as Properties).title) {
  //   //     returnData.name = {
  //   //       title: key,
  //   //       description: (value as Properties).description as string,
  //   //     };
  //   //     returnData.type = key;

  //   //     arrayTypes.push(returnData);
  //   //     return;
  //   //   }

  //   // });
  // }

  console.log('НЕ ПРОШЛИ ПРОВЕРКУ мы приняли данные здесь!!!!');
  arrayTypes = getType(jsonGraphQL as Properties);
  return arrayTypes;

  // return arrayTypes;

  // TODO: проверить если нет пропертиз
  // TODO: и если это вообще не объект
};
