interface TypesProps {
  info: ReturnData;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Types: React.FC<TypesProps> = ({ info, onClick }) => {
  const { name, arguments: aTypes, return: rTypes } = info;

  return (
    <div>
      {name?.description && (
        <span className="doc__root_type">{name?.description}</span>
      )}
      <span className="doc__root_type">{name?.title}</span> :{aTypes && `(`}
      {aTypes &&
        aTypes.map((item) => (
          <p key={item.name}>
            {item.name}:{item.type},
          </p>
        ))}
      {aTypes && `)`}
      <p onClick={onClick} className="doc__type_name">
        {rTypes}
      </p>
    </div>
  );
};
