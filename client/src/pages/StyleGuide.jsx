import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    HiSun, HiMoon, HiEnvelope, HiMagnifyingGlass, HiPlus, HiStar,
    HiOutlineUsers, HiOutlineBanknotes, HiOutlineCalendar, HiOutlineCog6Tooth,
    HiOutlineHome, HiOutlineBookOpen, HiOutlineHeart, HiOutlineChatBubbleLeft,
} from 'react-icons/hi2';
import { FaHandHoldingHeart, FaMosque, FaGraduationCap } from 'react-icons/fa6';

import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import Loader from '../components/common/Loader';
import Skeleton from '../components/common/Skeleton';
import EmptyState from '../components/shared/EmptyState';

// New Phase 0.5b components
import Sidebar from '../components/layout/Sidebar';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/common/ProgressBar';
import Avatar from '../components/common/Avatar';
import StarRating from '../components/common/StarRating';
import PrayerCountdown from '../components/ui/PrayerCountdown';
import ListRow from '../components/ui/ListRow';
import IconCircle from '../components/common/IconCircle';

const Section = ({ title, children }) => (
    <section className="mb-12">
        <h2
            className="text-2xl font-heading font-bold mb-6 pb-2"
            style={{ color: 'var(--color-text-primary)', borderBottom: '2px solid var(--color-border)' }}
        >
            {title}
        </h2>
        {children}
    </section>
);

const ColorSwatch = ({ name, variable, tailwind }) => (
    <div className="flex flex-col items-center gap-2">
        <div
            className="w-20 h-20 rounded-xl shadow-md border"
            style={{ backgroundColor: `var(${variable})`, borderColor: 'var(--color-border)' }}
        />
        <span className="text-xs font-body font-medium" style={{ color: 'var(--color-text-primary)' }}>
            {name}
        </span>
        <span className="text-[10px] font-body" style={{ color: 'var(--color-text-secondary)' }}>
            {tailwind}
        </span>
    </div>
);

// Sample data for new sections
const sidebarItems = [
    { icon: <HiOutlineHome className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <HiOutlineUsers className="w-5 h-5" />, label: 'Members', path: '/members' },
    { icon: <HiOutlineBanknotes className="w-5 h-5" />, label: 'Donations', path: '/donations' },
    { icon: <HiOutlineCalendar className="w-5 h-5" />, label: 'Events', path: '/events' },
    { icon: <HiOutlineBookOpen className="w-5 h-5" />, label: 'Madrasa', path: '/madrasa' },
    { icon: <HiOutlineCog6Tooth className="w-5 h-5" />, label: 'Settings', path: '/settings' },
];

const sampleUser = { name: 'Kasim Shah', role: 'Admin' };

const donationRows = [
    { avatar: { name: 'Ahmed Khan' }, title: 'Ahmed Khan', subtitle: 'Zakat', value: '$500', meta: 'Aug 5, 2026' },
    { avatar: { name: 'Sara Ali' }, title: 'Sara Ali', subtitle: 'Sadqah', value: '$150', meta: 'Aug 4, 2026' },
    { avatar: { name: 'Omar Malik' }, title: 'Omar Malik', subtitle: 'Monthly Donation', value: '$75', meta: 'Aug 3, 2026' },
    { avatar: { name: 'Fatima Zahra' }, title: 'Fatima Zahra', subtitle: 'Madrasa Fee', value: '$200', meta: 'Aug 2, 2026' },
];

const StyleGuide = () => {
    const { theme, toggleTheme } = useTheme();
    const [modalOpen, setModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // Target time = 2 hours from now for countdown demo
    const countdownTarget = new Date(Date.now() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000);

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-background)' }}
        >
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            🕌 Design System
                        </h1>
                        <p className="text-base font-body mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                            Faizan E Madina Sunni Masjid — Token & Component Reference
                        </p>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md"
                        style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                    >
                        {theme === 'dark' ? (
                            <HiSun className="w-6 h-6 text-accent" />
                        ) : (
                            <HiMoon className="w-6 h-6 text-primary" />
                        )}
                    </button>
                </div>

                {/* ===== COLOR PALETTE ===== */}
                <Section title="Color Palette">
                    <div className="flex flex-wrap gap-6">
                        <ColorSwatch name="Primary" variable="--color-primary" tailwind="bg-primary" />
                        <ColorSwatch name="Primary Light" variable="--color-primary-light" tailwind="bg-primary-light" />
                        <ColorSwatch name="Accent" variable="--color-accent" tailwind="bg-accent" />
                        <ColorSwatch name="Background" variable="--color-background" tailwind="bg-background" />
                        <ColorSwatch name="Surface" variable="--color-surface" tailwind="bg-surface" />
                        <ColorSwatch name="Surface Alt" variable="--color-surface-alt" tailwind="bg-surface-alt" />
                        <ColorSwatch name="Text Primary" variable="--color-text-primary" tailwind="text-primary" />
                        <ColorSwatch name="Text Secondary" variable="--color-text-secondary" tailwind="text-secondary" />
                        <ColorSwatch name="Border" variable="--color-border" tailwind="border" />
                    </div>
                </Section>

                {/* ===== TYPOGRAPHY ===== */}
                <Section title="Typography">
                    <div className="space-y-5">
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                Display — Poppins 700, 48px
                            </span>
                            <p className="text-5xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                بِسْمِ ٱللَّٰهِ Display
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                H1 — Poppins 700, 36px
                            </span>
                            <h1 className="text-4xl font-heading font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                Heading One
                            </h1>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                H2 — Poppins 600, 28px
                            </span>
                            <h2 className="text-3xl font-heading font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                Heading Two
                            </h2>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                H3 — Poppins 600, 22px
                            </span>
                            <h3 className="text-xl font-heading font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                Heading Three
                            </h3>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                Body — Inter 400, 16px
                            </span>
                            <p className="text-base font-body" style={{ color: 'var(--color-text-primary)' }}>
                                The mosque serves as a center for worship, education, community gatherings, and charitable activities.
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                Small — Inter 400, 14px
                            </span>
                            <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                                Last updated 2 hours ago · Prayer timings are approximate.
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-body mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>
                                Arabic — Amiri 700, 32px
                            </span>
                            <p className="text-3xl font-arabic font-bold" style={{ color: 'var(--color-primary)' }}>
                                ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
                            </p>
                        </div>
                    </div>
                </Section>

                {/* ===== BUTTONS ===== */}
                <Section title="Buttons">
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>Variants</p>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>Sizes</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>With Icons</p>
                            <div className="flex flex-wrap gap-3">
                                <Button icon={<HiPlus className="w-4 h-4" />}>Add New</Button>
                                <Button variant="secondary" icon={<HiStar className="w-4 h-4" />}>Favorite</Button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>States</p>
                            <div className="flex flex-wrap gap-3">
                                <Button loading>Loading</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ===== CARDS ===== */}
                <Section title="Cards">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <h4 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Static Card
                            </h4>
                            <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                                A simple content card without hover effects.
                            </p>
                        </Card>
                        <Card hover>
                            <h4 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Hover Card
                            </h4>
                            <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                                This card lifts up on hover with a shadow transition.
                            </p>
                        </Card>
                        <Card className="glass">
                            <h4 className="font-heading font-semibold text-lg mb-2" style={{ color: 'var(--color-text-primary)' }}>
                                Glass Card
                            </h4>
                            <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                                Glassmorphism style with backdrop blur effect.
                            </p>
                        </Card>
                    </div>
                </Section>

                {/* ===== INPUTS ===== */}
                <Section title="Inputs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Enter your name"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            icon={<HiEnvelope className="w-4 h-4" />}
                        />
                        <Input
                            label="Search"
                            name="search"
                            placeholder="Search…"
                            icon={<HiMagnifyingGlass className="w-4 h-4" />}
                        />
                        <Input
                            label="With Error"
                            name="error-demo"
                            placeholder="Invalid input"
                            error="This field is required"
                        />
                        <Input
                            label="Disabled"
                            name="disabled-demo"
                            placeholder="Cannot edit"
                            disabled
                        />
                    </div>
                </Section>

                {/* ===== BADGES ===== */}
                <Section title="Badges">
                    <div className="flex flex-wrap gap-3">
                        <Badge variant="success" dot>Active</Badge>
                        <Badge variant="warning" dot>Pending</Badge>
                        <Badge variant="error" dot>Expired</Badge>
                        <Badge variant="info">Information</Badge>
                        <Badge variant="gold">Premium</Badge>
                    </div>
                </Section>

                {/* ===== MODAL ===== */}
                <Section title="Modal">
                    <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        title="Sample Modal"
                    >
                        <p className="font-body text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                            This modal uses glassmorphism backdrop, Framer Motion animations, and closes on ESC or outside click.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" onClick={() => setModalOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    </Modal>
                </Section>

                {/* ===== LOADERS ===== */}
                <Section title="Loaders">
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <Loader size="sm" />
                            <p className="text-xs font-body mt-2" style={{ color: 'var(--color-text-secondary)' }}>Small</p>
                        </div>
                        <div className="text-center">
                            <Loader size="md" />
                            <p className="text-xs font-body mt-2" style={{ color: 'var(--color-text-secondary)' }}>Medium</p>
                        </div>
                        <div className="text-center">
                            <Loader size="lg" />
                            <p className="text-xs font-body mt-2" style={{ color: 'var(--color-text-secondary)' }}>Large</p>
                        </div>
                    </div>
                </Section>

                {/* ===== SKELETONS ===== */}
                <Section title="Skeletons">
                    <div className="max-w-md space-y-3">
                        <Skeleton height="16px" width="60%" />
                        <Skeleton height="12px" width="100%" count={3} className="mb-2" />
                        <Skeleton height="120px" rounded="rounded-2xl" />
                    </div>
                </Section>

                {/* ===== EMPTY STATE ===== */}
                <Section title="Empty State">
                    <Card>
                        <EmptyState
                            title="No Donations Yet"
                            message="When members make donations, they will appear here."
                            actionLabel="Make a Donation"
                            onAction={() => alert('Donation action!')}
                        />
                    </Card>
                </Section>

                {/* ===== GLASSMORPHISM ===== */}
                <Section title="Glassmorphism">
                    <div
                        className="relative rounded-2xl p-8 overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
                            minHeight: '200px',
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="glass rounded-2xl p-8 max-w-sm text-center">
                                <h3 className="text-xl font-heading font-bold text-white mb-2">
                                    Glass Effect
                                </h3>
                                <p className="text-sm font-body text-white/80">
                                    The .glass utility class applies backdrop blur and translucent background for a frosted-glass look.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ========================================
                    PHASE 0.5b — NEW COMPONENTS
                   ======================================== */}

                {/* ===== SIDEBAR NAVIGATION ===== */}
                <Section title="Sidebar Navigation">
                    <p className="text-sm font-body mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        Desktop (lg) shows full width with labels. Tablet (md) shows icon-only with tooltips. Mobile shows an off-canvas drawer (resize browser to test).
                    </p>
                    <div className="flex flex-wrap gap-6">
                        {/* Desktop preview */}
                        <div>
                            <p className="text-xs font-body font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                Desktop (Full)
                            </p>
                            <div
                                className="rounded-2xl overflow-hidden shadow-lg bg-primary-dark"
                                style={{ width: '240px', height: '460px' }}
                            >
                                <Sidebar
                                    items={sidebarItems}
                                    activeItem="/donations"
                                    user={sampleUser}
                                    onLogout={() => alert('Logout clicked!')}
                                />
                            </div>
                        </div>
                        {/* Tablet preview — icon-only */}
                        <div>
                            <p className="text-xs font-body font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                Tablet (Icon-only)
                            </p>
                            <div
                                className="rounded-2xl overflow-hidden shadow-lg bg-primary-dark flex flex-col"
                                style={{ width: '72px', height: '460px' }}
                            >
                                {/* Mini header */}
                                <div className="flex items-center justify-center px-2 py-5 border-b border-white/10">
                                    <span className="text-2xl">🕌</span>
                                </div>
                                {/* Icon-only nav */}
                                <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
                                    {sidebarItems.map((item) => {
                                        const isActive = '/donations' === item.path;
                                        return (
                                            <div
                                                key={item.path}
                                                className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                                                        ? 'bg-primary-light border-l-4 border-accent'
                                                        : 'border-l-4 border-transparent hover:bg-primary'
                                                    }`}
                                                title={item.label}
                                            >
                                                <span className={`text-lg ${isActive ? 'text-accent' : 'text-[#F5F2E8]/60 group-hover:text-[#F5F2E8]'}`}>
                                                    {item.icon}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </nav>
                                {/* Mini user avatar */}
                                <div className="border-t border-white/10 px-2 py-4 flex justify-center">
                                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-sm font-heading font-semibold text-[#F5F2E8]">
                                        K
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ===== STAT CARDS ===== */}
                <Section title="Stat Cards">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={<HiOutlineUsers className="w-5 h-5" />}
                            value="1,248"
                            label="Total Members"
                            trend={{ value: '12.0%', direction: 'up' }}
                        />
                        <StatCard
                            icon={<HiOutlineBanknotes className="w-5 h-5" />}
                            value="$34,750"
                            label="Total Donations"
                            trend={{ value: '8.5%', direction: 'up' }}
                        />
                        <StatCard
                            icon={<HiOutlineCalendar className="w-5 h-5" />}
                            value="24"
                            label="Events This Month"
                        />
                        <StatCard
                            icon={<HiOutlineHeart className="w-5 h-5" />}
                            value="89"
                            label="Volunteers"
                            trend={{ value: '3.2%', direction: 'down' }}
                        />
                    </div>
                </Section>

                {/* ===== PROGRESS BARS ===== */}
                <Section title="Progress Bars">
                    <div className="max-w-lg space-y-6">
                        <div>
                            <p className="text-sm font-body mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                Gold Variant — Donation Goal
                            </p>
                            <ProgressBar
                                value={34750}
                                max={50000}
                                label="Ramadan Fund"
                                variant="gold"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-body mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                Green Variant — General Progress
                            </p>
                            <ProgressBar
                                value={72}
                                max={100}
                                label="Madrasa Enrollment"
                                variant="green"
                            />
                        </div>
                    </div>
                </Section>

                {/* ===== AVATARS ===== */}
                <Section title="Avatars">
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                Sizes (with initials fallback)
                            </p>
                            <div className="flex items-end gap-4">
                                <Avatar name="Ahmed Khan" size="sm" />
                                <Avatar name="Ahmed Khan" size="md" />
                                <Avatar name="Ahmed Khan" size="lg" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-body mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                With image + status dots
                            </p>
                            <div className="flex items-end gap-4">
                                <Avatar
                                    src="https://i.pravatar.cc/100?img=3"
                                    name="Sara Ali"
                                    size="md"
                                    status="online"
                                />
                                <Avatar
                                    src="https://i.pravatar.cc/100?img=5"
                                    name="Omar Malik"
                                    size="md"
                                    status="offline"
                                />
                                <Avatar name="Fatima Z" size="md" status="online" />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ===== STAR RATINGS ===== */}
                <Section title="Star Ratings">
                    <div className="space-y-3">
                        {[5, 4, 3].map((r) => (
                            <div key={r} className="flex items-center gap-3">
                                <StarRating rating={r} size="md" />
                                <span className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                                    {r}.0 stars
                                </span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ===== PRAYER COUNTDOWN ===== */}
                <Section title="Prayer Countdown">
                    <div className="max-w-xs">
                        <PrayerCountdown
                            prayerName="Dhuhr"
                            targetTime={countdownTarget}
                            clockTime="12:45 PM"
                        />
                    </div>
                </Section>

                {/* ===== LIST ROWS ===== */}
                <Section title="List Rows">
                    <Card padding="p-0">
                        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <h4 className="text-sm font-heading font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                Recent Donations
                            </h4>
                        </div>
                        {donationRows.map((row, i) => (
                            <ListRow key={i} {...row} />
                        ))}
                    </Card>
                </Section>

                {/* ===== ICON CIRCLES ===== */}
                <Section title="Icon Circles">
                    <div className="flex flex-wrap items-end gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <IconCircle icon={<FaHandHoldingHeart />} variant="accent" size="lg" />
                            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>Zakat</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconCircle icon={<FaMosque />} variant="primary" size="lg" />
                            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>Masjid</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconCircle icon={<FaGraduationCap />} variant="success" size="lg" />
                            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>Madrasa</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconCircle icon={<HiOutlineHeart />} variant="error" size="md" />
                            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>Sadqah</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <IconCircle icon={<HiOutlineChatBubbleLeft />} variant="info" size="sm" />
                            <span className="text-xs font-body" style={{ color: 'var(--color-text-secondary)' }}>Support</span>
                        </div>
                    </div>
                </Section>

                {/* ===== HERO OVERLAY ===== */}
                <Section title="Hero Overlay">
                    <div
                        className="hero-overlay rounded-2xl overflow-hidden"
                        style={{
                            backgroundImage: 'linear-gradient(135deg, #0A3D26, #1B7A4D, #0F5132)',
                            minHeight: '240px',
                        }}
                    >
                        <div className="flex items-center justify-center px-8 py-16">
                            <div className="text-center">
                                <h2 className="text-3xl font-heading font-bold text-white mb-2">
                                    Welcome to Faizan E Madina
                                </h2>
                                <p className="text-base font-body text-white/80 max-w-lg mx-auto">
                                    The .hero-overlay class adds a gradient overlay from dark green to transparent — ideal for hero sections with background images.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Footer */}
                <div className="text-center pt-8 pb-4">
                    <p className="text-sm font-body" style={{ color: 'var(--color-text-secondary)' }}>
                        ✅ Design System v0.5b — All Components Ready
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StyleGuide;
