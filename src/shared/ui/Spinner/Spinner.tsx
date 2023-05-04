import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  size: 'small' | 'medium' | 'large';
}

const iconSize = {
  small: 16,
  medium: 24,
  large: 30,
};

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: iconSize[size] }} spin />
        }
        tip="Loading..."
        className={styles[`spinner_${size}`]}
      />
    </div>
  );
};

export default Spinner;
