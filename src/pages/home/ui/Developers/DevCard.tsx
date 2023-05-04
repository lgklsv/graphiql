import { Avatar, Card, Space, theme } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './Developers.module.scss';

const { Meta } = Card;

const DevCard = ({ translationKey, img, link, github }: IDevCard) => {
  const { t } = useTranslation();
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
          <Meta title={`${t(`developersList.${translationKey}`)}`} />
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
