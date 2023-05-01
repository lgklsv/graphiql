import { Space } from 'antd';
import { IDevCardList } from 'shared/lib/types';
import { useMatchMedia } from 'shared/hooks';
import DevCard from './DevCard';

const DevCardList = ({ devCardList }: IDevCardList) => {
  const { isMobile } = useMatchMedia();
  return (
    <Space size="large" direction={isMobile ? 'vertical' : 'horizontal'}>
      {devCardList.map(({ name, img, github, link }) => (
        <div key={link}>
          <DevCard name={name} img={img} github={github} link={link} />
        </div>
      ))}
    </Space>
  );
};

export default DevCardList;
