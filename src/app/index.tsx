import React from 'react';

// import { appTitle } from './config';
import './index.scss';

const App: React.FC = () => {
  return (
    <>
      <h1>Hello world!</h1>
      <h2 className="test-text-secondary">Text secondary</h2>
      <div className="test-block">
        <div className="test-block-second" />
      </div>
    </>
  );
};

export default App;
