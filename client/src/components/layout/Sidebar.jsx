import { useState } from 'react';
import { HiOutlineBars3, HiXMark, HiArrowRightOnRectangle, HiChevronRight, HiChevronLeft } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({
  items = [],
  activeItem = '',
  user = null,
  onLogout,
  logo,
}) => {
  // md breakpoint: collapsed = icon-only
  const [tabletExpanded, setTabletExpanded] = useState(false);
  // mobile: drawer open/closed
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ──────────────────────────
     NAV ITEM
  ────────────────────────── */
  const NavItem = ({ item, showLabel = true }) => {
    const isActive = activeItem === item.path || activeItem === item.label;
    return (
      <a
        key={item.path || item.label}
        href={item.path || '#'}
        title={!showLabel ? item.label : undefined}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-all duration-200 group text-sm font-body relative
          ${showLabel ? '' : 'justify-center'}
          ${isActive
            ? 'bg-primary-light border-l-4 border-accent text-[#F5F2E8] font-semibold'
            : 'text-[#F5F2E8]/70 hover:bg-primary hover:text-[#F5F2E8] border-l-4 border-transparent'
          }
        `}
      >
        <span className={`text-lg shrink-0 ${isActive ? 'text-accent' : 'text-[#F5F2E8]/60 group-hover:text-[#F5F2E8]'}`}>
          {item.icon}
        </span>
        {showLabel && <span className="truncate">{item.label}</span>}

        {/* Tooltip on hover for icon-only mode */}
        {!showLabel && (
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#1a1a1a] text-white text-xs font-body whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
            {item.label}
          </span>
        )}
      </a>
    );
  };

  /* ──────────────────────────
     USER FOOTER
  ────────────────────────── */
  const UserFooter = ({ compact = false }) => {
    if (!user) return null;
    return (
      <div className="border-t border-white/10 px-4 py-4">
        <div className={`flex items-center ${compact ? 'justify-center' : 'gap-3'}`}>
          <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-sm font-heading font-semibold text-[#F5F2E8] shrink-0">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          {!compact && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-[#F5F2E8] truncate">
                {user.name}
              </p>
              <p className="text-xs font-body text-[#F5F2E8]/50 truncate">
                {user.role || 'Member'}
              </p>
            </div>
          )}
          {!compact && onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#F5F2E8]/60 hover:text-[#F5F2E8] transition-colors cursor-pointer"
              title="Logout"
            >
              <HiArrowRightOnRectangle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  /* ──────────────────────────
     SIDEBAR HEADER
  ────────────────────────── */
  const SidebarHeader = ({ compact = false }) => (
    <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
      {logo || <span className="text-2xl">🕌</span>}
      {!compact && (
        <span className="text-lg font-heading font-bold text-[#F5F2E8] truncate">
          Faizan E Madina
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* ============================
          DESKTOP — lg (≥1024px)
          Full sidebar, icons + labels
         ============================ */}
      <aside className="hidden lg:flex flex-col bg-primary-dark w-64 min-h-full shrink-0">
        <SidebarHeader />
        <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
          {items.map((item) => (
            <NavItem key={item.path || item.label} item={item} showLabel />
          ))}
        </nav>
        <UserFooter />
      </aside>

      {/* ============================
          TABLET — md (768–1023px)
          Icon-only by default, expandable 
         ============================ */}
      <aside
        className={`hidden md:flex lg:hidden flex-col bg-primary-dark min-h-full shrink-0 transition-all duration-300 ${tabletExpanded ? 'w-64' : 'w-[72px]'
          }`}
      >
        <SidebarHeader compact={!tabletExpanded} />

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {items.map((item) => (
            <NavItem
              key={item.path || item.label}
              item={item}
              showLabel={tabletExpanded}
            />
          ))}
        </nav>

        <UserFooter compact={!tabletExpanded} />

        {/* Toggle expand/collapse */}
        <div className="border-t border-white/10 px-2 py-3 flex justify-center">
          <button
            onClick={() => setTabletExpanded(!tabletExpanded)}
            className="p-2 rounded-lg hover:bg-white/10 text-[#F5F2E8]/60 hover:text-[#F5F2E8] transition-colors cursor-pointer"
            title={tabletExpanded ? 'Collapse' : 'Expand'}
          >
            {tabletExpanded ? (
              <HiChevronLeft className="w-5 h-5" />
            ) : (
              <HiChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>

      {/* ============================
          MOBILE — < 768px
          Off-canvas drawer 
         ============================ */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2.5 rounded-xl bg-primary-dark text-[#F5F2E8] shadow-lg cursor-pointer hover:bg-primary transition-colors"
        >
          <HiOutlineBars3 className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-72 bg-primary-dark z-50 flex flex-col shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-[#F5F2E8]/60 hover:text-[#F5F2E8] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              <SidebarHeader />

              <nav className="flex-1 py-4 space-y-1 px-3 overflow-y-auto">
                {items.map((item) => (
                  <NavItem key={item.path || item.label} item={item} showLabel />
                ))}
              </nav>

              <UserFooter />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
