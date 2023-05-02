import { Avatar, Card, Space, theme } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { IDevCard } from 'shared/lib/types';
import styles from './Developers.module.scss';

const { Meta } = Card;

const DevCard = ({ name, img, link, github }: IDevCard) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Card className={styles.developers__cardItem} hoverable>
      <Space direction="vertical">
        <Avatar src={img} className={styles.developers__cardAvatar} />
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
