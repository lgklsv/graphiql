import { Typography } from 'antd';
import { ROUTES } from 'pages/config';
import { Link } from 'react-router-dom';
import styles from './TitleForm.module.scss';

const { Title, Text } = Typography;

interface TitleFormProps {
  title: string;
  text: string;
  textLink: string;
  link: ROUTES;
}

const TitleForm: React.FC<TitleFormProps> = ({
  title,
  text,
  textLink,
  link,
}) => {
  return (
    <Title className={styles.title}>
      {title}
      <Text className={styles.title__link}>
        {text}{' '}
        <Link className={styles.title__link_redirect} to={link}>
          {textLink}
        </Link>
      </Text>
    </Title>
  );
};

export default TitleForm;
