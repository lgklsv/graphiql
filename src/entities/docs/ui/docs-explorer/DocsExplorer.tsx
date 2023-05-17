import React from 'react';
import { JSONSchema6 } from 'json-schema';
import { useTranslation } from 'react-i18next';
import { Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { GraphQLSchema } from 'graphql';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { getJsonSchema, handlingSchema, removeCharacters } from './utils';
import {
  AllSchemaTypes,
  ParseSchemaData,
  SearchSchema,
  SectionTitle,
} from './ui';
import DocsText from './ui/docs-text/DocsText';

import styles from './DocsExplorer.module.scss';

const { Title } = Typography;

interface DocsExplorerProps {
  schema: GraphQLSchema | undefined;
}

const DocsExplorer: React.FC<DocsExplorerProps> = ({ schema }) => {
  const { t } = useTranslation();

  const jsonSchema = getJsonSchema(schema);

  const { addSnapshot, getSnapshot, undoSnapshot, getPrevSnapshot } =
    useRedoSnapshot(
      {
        title: '',
        snapshot: jsonSchema,
      },
      schema
    );

  const { snapshot, title } = getSnapshot();
  const prevTitle = getPrevSnapshot()?.title;

  if (!jsonSchema || !snapshot) {
    return null;
  }

  const { definitions } = jsonSchema;

  const snapshotDefinitions = (value: string) => {
    if (!definitions) {
      return null;
    }

    if (value in definitions) {
      return definitions[value];
    }

    return null;
  };

  const snapshotClickHandler = (value: string) => {
    return snapshot?.properties?.[value]
      ? addSnapshot({
          snapshot: snapshot.properties[value] as JSONSchema6,
          title: value,
        })
      : addSnapshot({
          snapshot: snapshotDefinitions(value) as JSONSchema6,
          title: value,
        });
  };

  const propertyClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    const value: string = removeCharacters(
      (event.target as HTMLElement).innerText
    );

    return snapshotClickHandler(value);
  };

  const handleBack = () => {
    undoSnapshot();
  };

  return (
    <Space direction="vertical" className={styles.docs} size={5}>
      <SearchSchema
        definitions={jsonSchema as IJson}
        onClick={snapshotClickHandler}
      />
      {title ? (
        <>
          <DocsText
            icon={<LeftOutlined />}
            onClick={handleBack}
            className={styles.docs__prev}
            style={{ cursor: 'pointer' }}
          >
            {!prevTitle ? t('docs.header.title') : prevTitle}
          </DocsText>
          <Title style={{ margin: 0 }} level={3}>
            {title}
          </Title>
        </>
      ) : (
        <Title level={5}>{t('docs.explorer.title')}</Title>
      )}

      {!snapshot.title && <SectionTitle isRootType={!title} />}

      <Space direction="vertical" size={10}>
        {handlingSchema(snapshot, title).map((dataTypes) => (
          <ParseSchemaData
            info={dataTypes}
            key={dataTypes.name?.title}
            onPropClick={
              // check the last field or not, so as not to call the function!
              !dataTypes.isLastType
                ? (event) => {
                    propertyClickHandler(event);
                  }
                : undefined
            }
          />
        ))}
      </Space>
      <div>
        {!title && (
          <AllSchemaTypes
            onPropClick={propertyClickHandler}
            definitions={definitions}
          />
        )}
      </div>
    </Space>
  );
};

export default DocsExplorer;
