import { createBrowserRouter, RouteObject } from 'react-router-dom';
import HomeMainLayout from '../layout/HomeMainLayout';
import HomePage from '../pages/HomePage/HomePage';
import ShippingInfoPage from '../pages/ShippingInfoPage/ShippingInfoPage';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import FurnitureIdPage from '../pages/FurnitureIdPage/FurnitureIdPage';
import AboutUsPage from '../pages/AboutUsPage/AboutUsPage';
import SignInViaGooglePage
  from '../pages/SignInViaGooglePage/SignInViaGooglePage';

const routes: RouteObject[] = [{
  path: '/',
  element: <HomeMainLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: '/:id', element: <FurnitureIdPage /> },
    { path: '/catalog', element: <CatalogPage /> },
    { path: '/shipping-info', element: <ShippingInfoPage /> },
    { path: '/auth/sign-in', element: <SignInPage /> },
    { path: '/auth/sign-in-google', element: <SignInViaGooglePage /> },
    { path: '/auth/sign-up', element: <SignUpPage /> },
    { path: '/about-us', element: <AboutUsPage /> },
  ],
}];

const router = createBrowserRouter(routes);
export default router;