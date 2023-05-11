interface IJson {
  [k: string]: import('json-schema').JSONSchema6Definition;
}

interface Properties {
  [key: string]: {
    title?: string;
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

interface ItemsReturn {
  anyOf: [{ type?: string; $ref?: string }];
}

interface IAnyOf {
  type?: string;
  $ref?: string;
  title?: string;
  description?: string;
  enum?: string[];
}

interface Ref {
  $ref?: string;
}
