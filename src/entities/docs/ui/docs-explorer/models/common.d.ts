interface IJson {
  [k: string]: import('json-schema').JSONSchema6Definition;
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

interface ReturnDataArguments {
  type?: null | string;
  description?: string | null;
  name: null | string;
  default?: null | string | boolean;
}
// TODO: rename
interface ReturnData {
  name: {
    title: null | string;
    description?: string | null;
  } | null;
  arguments?: ReturnDataArguments[] | null;
  return?: null | string;
  type?: TypeReturnData | null;
  isLastType: boolean = false;
}

interface TypeReturnData {
  title?: string | null;
  enum?: EnumReturnData[] | null;
}

interface EnumReturnData {
  key?: string | null;
  value?: string | null;
}
