import { GraphQLSchema, introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';

export const getJsonSchema = (data?: GraphQLSchema) => {
  if (!data) {
    return null;
  }

  const introspection = introspectionFromSchema(data);

  const jsonSchema = fromIntrospectionQuery(introspection, {
    ignoreInternals: true,
    nullableArrayItems: true,
    idTypeMapping: 'string',
  });

  return jsonSchema;
};
