import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';

const HomeMainLayout = () => {
  return (<div>
      <HeaderComponent />
      <Outlet />
    </div>
  );
};

export default HomeMainLayout;