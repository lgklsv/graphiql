/* eslint-disable no-underscore-dangle */
import React from 'react';
import { JSONSchema6 } from 'json-schema';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { graphql } from 'shared/api';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { getJsonSchema, handlingSchema, removeCharacters } from './utils';
import { AllSchemaTypes, ParseSchemaData, SectionTitle } from './ui';
import styles from './DocsExplorer.module.scss';

const DocsExplorer = () => {
  const { t } = useTranslation();
  const { data } = graphql.useGetSchemaQuery('{}');

  const jsonSchema = getJsonSchema(data);

  const { addSnapshot, getSnapshot, undoSnapshot, getPrevSnapshot } =
    useRedoSnapshot({
      title: '',
      snapshot: jsonSchema,
    });

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

  const handlePropertyClick = (event: React.MouseEvent<HTMLElement>) => {
    const value: string = removeCharacters(
      (event.target as HTMLElement).innerText
    );

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

  const handleBack = () => {
    undoSnapshot();
  };

  return (
    <div className={styles.docs}>
      {title && (
        <Button
          type="link"
          htmlType="submit"
          size="large"
          icon={<LeftOutlined />}
          onClick={handleBack}
          className={styles.docs__btn_prev_field}
        >
          {!prevTitle ? 'Doc' : prevTitle}
        </Button>
        // TODO: edit button
      )}

      {!title && <h3>{t('docs.explorer.title')}</h3>}

      <h3>{title}</h3>
      <div>{!snapshot.title && <SectionTitle isTitle={!title} />}</div>

      <div className={styles.docs__section_content}>
        {handlingSchema(snapshot, title).map((dataTypes) => (
          <ParseSchemaData
            info={dataTypes}
            key={dataTypes.name?.title}
            onClick={
              // check the last field or not, so as not to call the function!
              !dataTypes.isLastType
                ? (event) => {
                    handlePropertyClick(event);
                  }
                : undefined
            }
          />
        ))}
      </div>
      <div>
        {!title && (
          <AllSchemaTypes
            onClick={handlePropertyClick}
            definitions={definitions}
          />
        )}
      </div>
    </div>
  );
};

export default DocsExplorer;
