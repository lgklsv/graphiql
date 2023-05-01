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
    <Card style={isMobile ? { width: 280 } : { maxWidth: 300 }} hoverable>
      <Space direction="vertical">
        <Avatar
          src={img}
          size={isMobile ? 125 : 200}
          style={{ border: '1px solid #7156d9b8' }}
        />
        <Meta title={name} />
        <Space>
          <GithubOutlined style={{ color: colorPrimary }} />
          <a href={link} target="_blank" rel="noreferrer">
            {github}
          </a>
        </Space>
      </Space>
    </Card>
  );
};

export default DevCard;
