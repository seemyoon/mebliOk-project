import React from 'react';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';
import { Outlet } from 'react-router-dom';
import FooterComponent from '../components/FooterComponent/FooterComponent';

const HomeMainLayout = () => {
  return (
    <main>
      <HeaderComponent />
      <Outlet />
      <FooterComponent/>
    </main>
  );
};

export default HomeMainLayout;