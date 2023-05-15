interface ParseSchemaData {
  name: {
    title: null | string;
    description?: string | null;
  } | null;
  arguments?: ParseSchemaArguments[] | null;
  return?: null | string | { type: string };
  type?: TypeParseData | null;
  isLastType: boolean = false;
}

interface ParseSchemaArguments {
  type?: null | string;
  description?: string | null;
  name: null | string;
  default?: null | string | boolean;
}

interface TypeParseData {
  title?: string | null;
  enum?: EnumParseData[] | null;
}

interface EnumParseData {
  key?: string | null;
  value?: string | null;
}
