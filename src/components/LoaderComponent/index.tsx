import React from 'react';
import style from './LoaderComponent.module.scss';

const LoaderComponent: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderComponent;
