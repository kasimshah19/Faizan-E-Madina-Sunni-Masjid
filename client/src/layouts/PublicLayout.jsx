import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';

const PublicLayout = () => {
  return (
    <div
      className="
        min-h-screen min-w-0
        overflow-x-hidden
        bg-[#f7f8f4] text-[#163c31]
        dark:bg-slate-950 dark:text-white
        transition-colors duration-300
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
    </div>
  );
};

export default PublicLayout;