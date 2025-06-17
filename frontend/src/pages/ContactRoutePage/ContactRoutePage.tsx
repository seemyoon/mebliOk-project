import ProfilePage from '../ProfilePage/ProfilePage';
import SignInPage from '../SignInPage/SignInPage';

const ContactRoutePage = () => {
  
  
  return __ ? <ProfilePage /> : <SignInPage />;
};

export default ContactRoutePage;