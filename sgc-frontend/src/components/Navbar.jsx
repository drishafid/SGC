import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Calendar, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) return null;

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
        { path: '/clients', label: 'Clients', icon: <Users size={15} /> },
        { path: '/rendez-vous', label: 'Rendez-vous', icon: <Calendar size={15} /> },
    ];

    const getInitials = (name) =>
        name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'U';

    const s = {
        nav: {
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(13,15,20,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
            fontFamily: "'Sora', sans-serif",
        },
        inner: {
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        left: {
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
        },
        logo: {
            fontSize: '16px',
            fontWeight: 600,
            color: '#c9a84c',
            letterSpacing: '0.12em',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
        },
        logoDot: {
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#c9a84c',
            opacity: 0.5,
        },
        links: {
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
        },
        right: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
        },
        userChip: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 10px 5px 5px',
            borderRadius: '99px',
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
        },
        userAvatar: {
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.15)',
            border: '0.5px solid rgba(201,168,76,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 600,
            color: '#c9a84c',
            flexShrink: 0,
        },
        userName: {
            fontSize: '12px',
            fontWeight: 500,
            color: '#9a9489',
        },
        logoutBtn: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 13px',
            borderRadius: '8px',
            background: 'rgba(224,92,92,0.08)',
            border: '0.5px solid rgba(224,92,92,0.2)',
            color: '#e05c5c',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
            transition: 'background 0.15s, border-color 0.15s',
        },
    };

    const linkBase = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'background 0.15s, color 0.15s',
        letterSpacing: '0.01em',
    };

    const linkActive = {
        ...linkBase,
        background: 'rgba(201,168,76,0.12)',
        color: '#c9a84c',
        border: '0.5px solid rgba(201,168,76,0.2)',
    };

    const linkInactive = {
        ...linkBase,
        background: 'transparent',
        color: '#5c5850',
        border: '0.5px solid transparent',
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');
                .nav-link-inactive:hover { background: rgba(255,255,255,0.04) !important; color: #9a9489 !important; }
                .nav-logout:hover { background: rgba(224,92,92,0.15) !important; border-color: rgba(224,92,92,0.35) !important; }
            `}</style>

            <nav style={s.nav}>
                <div style={s.inner}>

                    {/* Left — Logo + Links */}
                    <div style={s.left}>
                        <Link to="/dashboard" style={s.logo}>
                            SGC
                            <span style={s.logoDot} />
                        </Link>

                        <div style={s.links}>
                            {navLinks.map(link => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={isActive ? '' : 'nav-link-inactive'}
                                        style={isActive ? linkActive : linkInactive}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right — User + Logout */}
                    <div style={s.right}>
                        <div style={s.userChip}>
                            <div style={s.userAvatar}>{getInitials(user.name)}</div>
                            <span style={s.userName}>{user.name}</span>
                        </div>

                        <button
                            className="nav-logout"
                            style={s.logoutBtn}
                            onClick={handleLogout}
                        >
                            <LogOut size={13} />
                            Déconnexion
                        </button>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Navbar;