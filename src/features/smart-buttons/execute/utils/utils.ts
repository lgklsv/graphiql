import { t } from 'i18next';

type ToolsErrors = {
  [key: string]: string;
};

const checkHeadersVariables = (
  fields: {
    value: string | undefined;
    name: string;
    type: string;
  }[]
) => {
  let hasErrors = false;

  const errors = fields.reduce((acc, field) => {
    const { value, name, type } = field;
    if (value === '') {
      acc[name] = '';
    } else if (value) {
      try {
        const parsedObject = JSON.parse(value);
        if (typeof parsedObject !== 'object' || Array.isArray(parsedObject)) {
          throw new Error();
        }
        if (parsedObject && name === 'headers') {
          const regExpNames = /^[A-Za-z0-9\-._]+$/;
          const regExpValues = /^[\x20-\xFF]*$/; // all ISO8859-1 symbols
          const entries = Object.entries(parsedObject);
          const isValid = entries.every(
            ([headerName, headerValue]) =>
              regExpNames.test(headerName) &&
              regExpValues.test(headerValue as string)
          );
          if (!isValid) throw new Error();
        }
        acc[name] = '';
      } catch (err) {
        const errorMessage = `${t('sandbox.response.error', {
          fieldName: type,
        })}`;
        acc[name] = errorMessage;
        hasErrors = true;
      }
    }
    return acc;
  }, {} as ToolsErrors);

  return { hasErrors, errors };
};

export default checkHeadersVariables;
