interface IJson {
  [k: string]: import('json-schema').JSONSchema6Definition;
}

interface ItemsReturn {
  anyOf: [{ type?: string; $ref?: string }];
}

interface Ref {
  $ref?: string;
}

interface Return {
  items?: ItemsReturn | Ref;
  type?: 'array' | 'object';
  $ref?: string;
  description?: string;
}

interface Arguments {
  type?: 'array' | 'object';
  required?: string[];
  properties?: {
    [key: string]: {
      description?: string;
      default?: boolean;
      $ref?: string;
      items?: ItemsReturn | Ref;
      type?: 'array' | 'object';
    };
  };
}

interface Properties {
  [key: string]: {
    description?: string;
    type?: 'array' | 'object';
    properties?: {
      return?: Return;
      arguments: Arguments;
      required?: string[];
    };
    required?: string[];
  } | null;
}

interface RetutnDataArguments {
  type?: null | string;
  description?: string | null;
  name: null | string;
  default?: null | string | boolean;
}
