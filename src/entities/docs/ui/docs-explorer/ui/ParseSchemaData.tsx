interface ParseSchemaDataProps {
  info: ParseSchemaData;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // this function must be broadcast to types, separately from extra characters, so that the function works further
}

export const ParseSchemaData: React.FC<ParseSchemaDataProps> = ({
  info,
  onClick,
}) => {
  const { name, arguments: argumentTypes, return: returnTypes } = info;

  return (
    <>
      <div>
        <span className="doc__root_type">{name?.title}</span> :{/* argument */}
        {argumentTypes && `(`}
        {argumentTypes &&
          argumentTypes.map((item) => (
            <>
              <p className="doc__arg_name" key={item.name}>
                {item.name}:
              </p>
              <p className="doc__arg_type" key={item.type} onClick={onClick}>
                {item.type}
              </p>
            </>
          ))}
        {argumentTypes && `)`}
        <p onClick={onClick} className="doc__type_name">
          {returnTypes}
        </p>
      </div>
      <h4>
        {name?.description && (
          <span className="doc__root_type">{name?.description}</span>
        )}
      </h4>
    </>
  );
};
