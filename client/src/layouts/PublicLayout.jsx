import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <div
      className="
        min-h-screen min-w-0
        overflow-x-hidden
        bg-[#f7f8f4] text-[#163c31]
        dark:bg-slate-950 dark:text-white
        transition-colors duration-300
        flex flex-col
      "
    >
      <Header />

      <main
        id="main-content"
        className="
          min-w-0 flex-1
          bg-transparent
          transition-colors duration-300
        "
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;