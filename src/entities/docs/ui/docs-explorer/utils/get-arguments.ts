import { isRequired } from './is-required';
import { sliceData } from './slice-data';

export const getArguments = (argument: Arguments): RetutnDataArguments[] => {
  const arrayArguments: RetutnDataArguments[] = [];

  if (argument.properties) {
    // проверка на пропертиз
    Object.entries(argument.properties).forEach(([key, value]) => {
      const argumentItem: RetutnDataArguments = {
        type: null,
        name: key,
        description: value.description ? value.description : null,
        default: 'default' in value ? value.default : null,
      };

      // проверка типа - если массив, добавляем кавычки
      if (Object.keys(value).includes('type') && value.type === 'array') {
        if (value.items) {
          // проверка на null значения
          if ('anyOf' in value.items) {
            const array = ((value as Return).items as ItemsReturn).anyOf;

            array.forEach((prop) => {
              if (prop.$ref) {
                argumentItem.type = `[${sliceData(prop.$ref as string)}]`;
              }
            });

            arrayArguments.push(argumentItem);
            return;
          }

          //   если не null
          const argumentsDataItemsRef = `[${sliceData(
            value?.items?.$ref as string
          )}!]`;

          // проверка на обязательное поле - есть ли в объекте поле required
          argumentItem.type = isRequired(key, argument.required)
            ? `${argumentsDataItemsRef}!`
            : argumentsDataItemsRef;

          arrayArguments.push(argumentItem);
        }

        return;
      }

      const argumentsDataItemsRef = `${sliceData(value?.$ref as string)}`;
      // проверка на обязательное поле
      argumentItem.type = isRequired(key, argument.required)
        ? `${argumentsDataItemsRef}!`
        : argumentsDataItemsRef;

      arrayArguments.push(argumentItem);
    });
  }

  return arrayArguments;
};
