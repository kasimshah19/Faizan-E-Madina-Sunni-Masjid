import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
// import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default PublicLayout;

