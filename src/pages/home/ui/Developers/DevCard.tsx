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
    <a href={link} target="_blank" rel="noreferrer">
      <Card className={styles.developers__cardItem} hoverable>
        <Space direction="vertical">
          <Avatar
            src={img}
            className={styles.developers__cardAvatar}
            alt="github user picture"
          />
          <Meta title={name} />
          <Space>
            <GithubOutlined style={{ color: colorPrimary }} />
            <span> {github} </span>
          </Space>
        </Space>
      </Card>
    </a>
  );
};

export default DevCard;
