import { FIELD } from '../../const/field';
import { sliceData } from '../helpers/slice-data';
import { isRequired } from './is-required';

export const getArguments = (argument: Arguments): ParseSchemaArguments[] => {
  const arrayArguments: ParseSchemaArguments[] = [];

  if (argument.properties) {
    Object.entries(argument.properties).forEach(([key, value]) => {
      const argumentItem: ParseSchemaArguments = {
        type: null,
        name: key,
        description: value.description ? value.description : null,
        default: 'default' in value ? value.default : null,
      };

      if (FIELD.TYPE in value && value.type === 'array') {
        if (!value.items) {
          return;
        }

        if (FIELD.ANY in value.items) {
          const array = ((value as Return).items as ItemsReturn).anyOf;

          array.forEach((prop) => {
            if (prop.$ref) {
              argumentItem.type = `[${sliceData(prop.$ref as string)}]`;
            }
          });

          arrayArguments.push(argumentItem);
          return;
        }

        const argumentsDataItemsRef = `[${sliceData(
          value?.items?.$ref as string
        )}!]`;

        argumentItem.type = isRequired(key, argument.required)
          ? `${argumentsDataItemsRef}!`
          : argumentsDataItemsRef;

        arrayArguments.push(argumentItem);

        return;
      }

      const argumentsDataItemsRef = `${sliceData(value?.$ref as string)}`;

      argumentItem.type = isRequired(key, argument.required)
        ? `${argumentsDataItemsRef}!`
        : argumentsDataItemsRef;

      arrayArguments.push(argumentItem);
    });
  }

  return arrayArguments;
};
