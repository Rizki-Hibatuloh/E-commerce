// src/App.jsx
import { Outlet, useLocation } from 'react-router-dom'; 
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

function App() {
  const location = useLocation();
  
  // Page yang tidak perlu Navbar dan Footer
  const hideNavbarAndFooterRoutes = ['/login', '/register'];
  
  const shouldHideNavbarAndFooter = hideNavbarAndFooterRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbarAndFooter && <Navbar />}
      <Outlet />
      {!shouldHideNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;