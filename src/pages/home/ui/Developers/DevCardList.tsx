import { Space } from 'antd';
import { IDevCardList } from 'shared/lib/types';
import DevCard from './DevCard';
import styles from './Developers.module.scss';

const DevCardList = ({ devCardList }: IDevCardList) => {
  return (
    <Space size="small" className={styles.developers__list}>
      {devCardList.map(({ name, img, github, link }) => (
        <div key={link}>
          <DevCard name={name} img={img} github={github} link={link} />
        </div>
      ))}
    </Space>
  );
};

export default DevCardList;
