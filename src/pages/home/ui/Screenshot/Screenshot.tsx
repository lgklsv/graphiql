import React from 'react';
import { Image } from 'antd';
import screenshot from './assets/screenshot.png';

const Screenshot: React.FC = () => {
  return (
    <section>
      <Image width="100%" src={screenshot} preview={false} />
    </section>
  );
};

export default Screenshot;
