import { isRequired } from './is-required';
import { sliceData } from './slice-data';
import { getArguments } from './get-arguments';

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

  console.log(jsonGraphQL);

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

        if (key === 'arguments' || key === 'return') {
          returnData.name = clickedData ? { title: clickedData } : null;
          const arrayArguments = getArguments(value as Arguments);

          console.log(arrayArguments);

          // TODO: нужно передавать объект клика!

          return;
        }

        // проверка третьего уровня.

        returnData.name = { title: key }; // название полей в Query
        // на этом этапе нет Arguments
        // countries: {props, req, type}
        // Arguments внутри value.props

        // 3 УРОВЕНЬ
        Object.entries(value.properties).forEach(([keyArgs, valueArgs]) => {
          if (keyArgs === 'arguments') {
            const arrayArguments = getArguments(valueArgs as Arguments);

            returnData = {
              ...returnData,
              ...{ arguments: [...arrayArguments] },
            };
          }

          if (keyArgs === 'return') {
            // проверка типа возвращаемого занчения
            //  проверка items , в нем могут быть сразу ref ar anyOf

            if (Object.keys(valueArgs as Return).includes('type')) {
              if ((valueArgs as Return).type === 'array') {
                if (
                  Object.keys(
                    (valueArgs as Return).items as ItemsReturn
                  ).includes('anyOf')
                ) {
                  const array = ((valueArgs as Return).items as ItemsReturn)
                    .anyOf;

                  let returnDataAnyOf = '';

                  array.forEach((prop) => {
                    if (prop.$ref) {
                      returnDataAnyOf = `[${sliceData(prop.$ref as string)}]`;

                      returnData = {
                        ...returnData,
                        ...{ return: returnDataAnyOf },
                      };
                    }
                  });

                  return;
                }

                const returnDataItemsref = `[${sliceData(
                  valueArgs.items.$ref as string
                )}!]!`;
                // TODO: проверить последний ! на больших значениях
                returnData = {
                  ...returnData,
                  ...{ return: returnDataItemsref },
                };
              }
            }
          }

          // ОБРАБОТКА ЧИСТОГО ТИПА!
          if (Object.keys(valueArgs as object).includes('$ref')) {
            const typesTheBest = sliceData(valueArgs.$ref as string);

            returnData = {
              ...returnData,
              ...{ return: typesTheBest },
            };
          }
        });

        arrayTypes.push(returnData);
      }
    );
  }

  // TODO: проверить если нет пропертиз

  // console.log(arrayTypes);

  return arrayTypes;
};

export const getTypesSchema = () => {};
