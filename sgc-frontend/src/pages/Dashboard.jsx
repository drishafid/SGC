import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Users, Calendar, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
 
const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        fetchStats();
    }, []);
 
    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await api.get('/dashboard');
            setStats(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching stats', error);
            setError('Impossible de charger les statistiques.');
        } finally {
            setLoading(false);
        }
    };
 
    const getInitials = (name) =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
 
    const s = {
        page: {
            minHeight: '100vh',
            background: '#0d0f14',
            color: '#f0ece0',
            fontFamily: "'Sora', sans-serif",
            padding: '2rem 1.5rem 4rem',
        },
        inner: { maxWidth: '900px', margin: '0 auto' },
 
        // Header
        eyebrow: {
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#c9a84c',
            marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px',
        },
        eyebrowLine: { display: 'inline-block', width: '18px', height: '1px', background: '#c9a84c' },
        title: { fontSize: '28px', fontWeight: 600, color: '#f0ece0', lineHeight: 1.15 },
        subtitle: { fontSize: '13px', color: '#9a9489', marginTop: '5px', fontWeight: 300 },
 
        // Stat cards
        statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '2rem' },
        statCard: {
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            transition: 'border-color 0.2s',
            cursor: 'default',
        },
        iconWrap: (color) => ({
            width: '48px', height: '48px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: color, flexShrink: 0,
        }),
        statLabel: {
            fontSize: '11px', color: '#5c5850', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px',
        },
        statVal: { fontSize: '26px', fontWeight: 600, color: '#f0ece0' },
 
        // Panel
        panel: {
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '14px',
            overflow: 'hidden',
        },
        panelHeader: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.25rem',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        },
        panelTitle: { fontSize: '14px', fontWeight: 600, color: '#c9a84c', letterSpacing: '0.04em' },
        viewAll: {
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '12px', color: '#9a9489', textDecoration: 'none',
            fontWeight: 500, transition: 'color 0.15s',
        },
 
        // Table
        table: { width: '100%', borderCollapse: 'collapse' },
        th: {
            padding: '10px 16px', textAlign: 'left',
            fontSize: '10px', fontWeight: 500, color: '#5c5850',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        },
        td: {
            padding: '13px 16px',
            borderBottom: '0.5px solid rgba(255,255,255,0.04)',
            verticalAlign: 'middle',
        },
        dateText: { fontSize: '13px', fontWeight: 500, color: '#f0ece0', fontFamily: "'DM Mono', monospace" },
        noteText: { fontSize: '12px', color: '#5c5850', fontStyle: 'italic', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        avatar: {
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 600, flexShrink: 0,
            background: 'rgba(201,168,76,0.12)', color: '#c9a84c',
            border: '0.5px solid rgba(201,168,76,0.25)',
        },
        clientName: { fontSize: '13px', color: '#f0ece0', fontWeight: 400 },
 
        // States
        centerBox: {
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '60vh',
        },
        errorCard: {
            background: '#13161e',
            border: '0.5px solid rgba(224,92,92,0.3)',
            borderRadius: '14px',
            padding: '2.5rem 3rem',
            textAlign: 'center',
        },
        errorTitle: { fontSize: '15px', fontWeight: 500, color: '#e05c5c', margin: '12px 0 0' },
        retryBtn: {
            marginTop: '1.25rem',
            padding: '9px 22px', borderRadius: '9px',
            background: 'rgba(224,92,92,0.12)', color: '#e05c5c',
            border: '0.5px solid rgba(224,92,92,0.3)',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
        },
        emptyState: { padding: '3.5rem 2rem', textAlign: 'center' },
        emptyTitle: { fontSize: '14px', color: '#9a9489', marginTop: '12px' },
        emptySub: { fontSize: '12px', color: '#5c5850', marginTop: '4px' },
    };
 
    const iconConfigs = [
        { label: 'Total Clients',   key: 'total_clients', icon: <Users size={20} />,    bg: 'rgba(201,168,76,0.15)',  color: '#c9a84c' },
        { label: 'Total RDV',       key: 'total_rdv',     icon: <Calendar size={20} />, bg: 'rgba(92,212,160,0.12)', color: '#5cd4a0' },
        { label: 'RDV à venir',     key: 'rdv_a_venir',   icon: <Clock size={20} />,    bg: 'rgba(100,160,240,0.12)',color: '#64a0f0' },
    ];
 
    if (loading) return (
        <div style={{ ...s.page }}>
            <div style={s.centerBox}>
                <Loader2 size={36} style={{ color: '#c9a84c', animation: 'spin 1s linear infinite' }} />
            </div>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap'); @keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
 
    if (error) return (
        <div style={{ ...s.page }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');`}</style>
            <div style={s.centerBox}>
                <div style={s.errorCard}>
                    <AlertCircle size={36} style={{ color: '#e05c5c', margin: '0 auto' }} />
                    <p style={s.errorTitle}>{error}</p>
                    <button style={s.retryBtn} onClick={fetchStats}>Réessayer</button>
                </div>
            </div>
        </div>
    );
 
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
                @keyframes spin { to { transform: rotate(360deg); } }
                .stat-card-hover:hover { border-color: rgba(201,168,76,0.25) !important; }
                .row-hover:hover { background: #1a1e2a !important; }
                .view-all-link:hover { color: #c9a84c !important; }
            `}</style>
 
            <div style={s.page}>
                <div style={s.inner}>
 
                    {/* Header */}
                    <div style={{ marginBottom: '2.5rem' }}>
                        <div style={s.eyebrow}>
                            <span style={s.eyebrowLine} />
                            Dashboard
                        </div>
                        <div style={s.title}>Overview</div>
                        <div style={s.subtitle}>Your activity at a glance — clients, appointments, and what's coming next.</div>
                    </div>
 
                    {/* Stat Cards */}
                    <div style={s.statsRow}>
                        {iconConfigs.map((cfg, i) => (
                            <div key={i} className="stat-card-hover" style={s.statCard}>
                                <div style={s.iconWrap(cfg.bg)}>
                                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                                </div>
                                <div>
                                    <div style={s.statLabel}>{cfg.label}</div>
                                    <div style={s.statVal}>{stats[cfg.key]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
 
                    {/* Upcoming Appointments */}
                    <div style={s.panel}>
                        <div style={s.panelHeader}>
                            <div style={s.panelTitle}>Upcoming Appointments</div>
                            <Link to="/rendez-vous" className="view-all-link" style={s.viewAll}>
                                View all <ArrowRight size={13} />
                            </Link>
                        </div>
 
                        <div style={{ overflowX: 'auto' }}>
                            <table style={s.table}>
                                <thead>
                                    <tr>
                                        <th style={s.th}>Date</th>
                                        <th style={s.th}>Client</th>
                                        <th style={s.th}>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.prochains_rdv.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" style={s.td}>
                                                <div style={s.emptyState}>
                                                    <Calendar size={32} style={{ color: '#5c5850', margin: '0 auto', opacity: 0.4 }} />
                                                    <div style={s.emptyTitle}>No upcoming appointments</div>
                                                    <div style={s.emptySub}>Schedule a new rendez-vous to see it here.</div>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        stats.prochains_rdv.map(rdv => (
                                            <tr
                                                key={rdv.id}
                                                className="row-hover"
                                                style={{ background: 'transparent', transition: 'background 0.15s' }}
                                            >
                                                <td style={s.td}>
                                                    <span style={s.dateText}>
                                                        {new Date(rdv.date).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })}
                                                    </span>
                                                </td>
                                                <td style={s.td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={s.avatar}>{getInitials(rdv.client.nom)}</div>
                                                        <span style={s.clientName}>{rdv.client.nom}</span>
                                                    </div>
                                                </td>
                                                <td style={s.td}>
                                                    <span style={s.noteText}>
                                                        {rdv.note || 'Aucune note'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
 
                </div>
            </div>
        </>
    );
};
 
export default Dashboard;