import { Space } from 'antd';
import DevCard from './DevCard';
import styles from './Developers.module.scss';

const DevCardList = ({ devCardList }: IDevCardList) => {
  return (
    <Space size="small" className={styles.developers__list}>
      {devCardList.map(({ name, translationKey, img, github, link }) => (
        <div key={link}>
          <DevCard
            name={name}
            translationKey={translationKey}
            img={img}
            github={github}
            link={link}
          />
        </div>
      ))}
    </Space>
  );
};

export default DevCardList;
