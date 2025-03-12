import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomeMainLayout from '../layout/HomeMainLayout';
import FurniturePage from '../pages/FurniturePage/FurniturePage';
import ShippingInfoPage from '../pages/ShippingInfoPage/ShippingInfoPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import FurnitureIdPage from '../pages/FurnitureIdPage/FurnitureIdPage';

const routes: RouteObject[] = [{
  path: '/',
  element: <HomeMainLayout />,
  children: [
    { index: true, element: <FurniturePage /> },
    {path: '/:id', element: <FurnitureIdPage />},
    { path: '/catalog', element: <CatalogPage /> },
    { path: '/shipping-info', element: <ShippingInfoPage /> },
    { path: '/auth/sign-in', element: <SignInPage /> },
    { path: '/auth/sign-up', element: <SignUpPage /> },
  ],
}];

const router = createBrowserRouter(routes);
export default router;