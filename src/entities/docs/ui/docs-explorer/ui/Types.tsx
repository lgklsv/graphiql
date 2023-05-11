interface TypesProps {
  info: ReturnData;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // this function must be broadcast to types, separately from extra characters, so that the function works further
}

export const Types: React.FC<TypesProps> = ({ info, onClick }) => {
  const { name, arguments: aTypes, return: rTypes } = info;

  return (
    <>
      <div>
        <span className="doc__root_type">{name?.title}</span> :{aTypes && `(`}
        {aTypes &&
          aTypes.map((item) => (
            <p key={item.name} onClick={onClick}>
              {item.type}
            </p>
          ))}
        <p onClick={onClick} className="doc__type_name">
          {rTypes}
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
