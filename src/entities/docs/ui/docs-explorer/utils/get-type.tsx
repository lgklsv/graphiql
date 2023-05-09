import { getArguments } from './get-arguments';
import { FIELD } from '../const/field';
import { getReturn } from './get-return';

// interface TypesProps {
//   info: string[];
//   onClick: (e: React.MouseEvent<HTMLElement>) => void;
// }

// export const Types: React.FC<TypesProps> = ({ info, onClick }) => {
//   const [name, type] = info;

//   return (
//     <div>
//       <span className="doc__root_type">{name}</span> :
//       <p onClick={onClick} className="doc__type_name">
//         {type}
//       </p>
//     </div>
//   );
// };

// ========= объект на выходе
interface ReturnData {
  name: {
    title: null | string;
    description?: string | null;
  } | null;
  arguments?: RetutnDataArguments[] | null;
  return?: null | string;
  type?: null | string;
}

export const getType = (
  jsonGraphQL: IJson,
  clickedData?: string
): ReturnData[] => {
  // TODO: проверять на входе, объект ли это

  const arrayTypes: ReturnData[] = [];

  let returnData: ReturnData = {
    name: null,
    arguments: null,
    return: null,
    type: null,
  };

  // первый рендеринг - Query
  if (Object.keys(jsonGraphQL).includes('Query')) {
    Object.entries(jsonGraphQL).forEach(([key]) => {
      arrayTypes.push({ name: { title: key.toLowerCase() }, return: key });
    });

    return arrayTypes;
  }

  // 2 УРОВЕНЬ - эндпоинты Query.properties

  if ('properties' in jsonGraphQL) {
    console.log('has properties');

    Object.entries(jsonGraphQL.properties as Properties).forEach(
      ([key, value]) => {
        returnData = {
          name: null,
          arguments: null,
          return: null,
          type: null,
        };

        if (key === FIELD.ARGUMENTS || key === FIELD.RETURN) {
          const arrayArguments = getArguments(value as Arguments);
          const returnDataAnyOf = getReturn(value as Return);

          returnData.name = clickedData ? { title: clickedData } : null;
          returnData.arguments = arrayArguments.length ? arrayArguments : null;
          returnData.return = returnDataAnyOf && null;

          arrayTypes.push(returnData);

          // TODO: нужно передавать объект клика!
          return;
        }

        returnData.name = { title: key }; // название полей в Query

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

              returnData = {
                ...returnData,
                ...{ return: returnDataAnyOf },
              };
            }
          }
        );

        arrayTypes.push(returnData);
      }
    );
  }

  // TODO: проверить если нет пропертиз
  // TODO: и если это вообще не объект

  console.log(arrayTypes);

  return arrayTypes;
};
