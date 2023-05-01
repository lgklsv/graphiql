import { Avatar, Card, Space, theme } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { IDevCard } from 'shared/lib/types';
import { useMatchMedia } from 'shared/hooks';

const { Meta } = Card;

const DevCard = ({ name, img, link, github }: IDevCard) => {
  const { isMobile } = useMatchMedia();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Card
      style={isMobile ? { width: 300 } : { maxWidth: 300 }}
      hoverable
      cover={isMobile ? '' : <img alt={name} src={img} />}
    >
      {isMobile && <Avatar src={img} size={125} />}
      <Meta title={name} />
      <Space>
        <GithubOutlined style={{ color: colorPrimary }} />
        <a href={link} target="_blank" rel="noreferrer">
          {github}
        </a>
      </Space>
    </Card>
  );
};

export default DevCard;
