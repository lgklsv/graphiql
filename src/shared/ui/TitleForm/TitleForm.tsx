import { Typography } from 'antd';
import { ROUTES } from 'pages/config';
import { Link } from 'react-router-dom';
import style from './TitleForm.module.scss';

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
    <Title className={style.form_title}>
      {title}
      <Text className={style.form_link}>
        {text} <Link to={link}> {textLink}</Link>
      </Text>
    </Title>
  );
};

export default TitleForm;
