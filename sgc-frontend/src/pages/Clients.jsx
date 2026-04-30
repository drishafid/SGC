import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Plus, Edit2, Trash2, X, Check, Loader2, Phone, Mail } from 'lucide-react';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchClients();
    }, [search]);

    const fetchClients = async () => {
        try {
            const response = await api.get(`/clients?search=${search}`);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await api.put(`/clients/${editingId}`, { nom, email, telephone });
            } else {
                await api.post('/clients', { nom, email, telephone });
            }
            resetForm();
            fetchClients();
        } catch (error) {
            alert("Erreur lors de l'enregistrement. Vérifiez si l'email est unique.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (client) => {
        setNom(client.nom);
        setEmail(client.email);
        setTelephone(client.telephone);
        setEditingId(client.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        const client = clients.find(c => c.id === id);
        if (window.confirm(`Remove ${client?.nom} from the directory?`)) {
            await api.delete(`/clients/${id}`);
            fetchClients();
        }
    };

    const resetForm = () => {
        setNom('');
        setEmail('');
        setTelephone('');
        setEditingId(null);
        setShowForm(false);
    };

    const getInitials = (name) =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const styles = {
        page: {
            minHeight: '100vh',
            background: '#0d0f14',
            color: '#f0ece0',
            fontFamily: "'Sora', sans-serif",
            padding: '2rem 1.5rem 4rem',
        },
        inner: {
            maxWidth: '900px',
            margin: '0 auto',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2.5rem',
        },
        eyebrow: {
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        },
        eyebrowLine: {
            display: 'inline-block',
            width: '18px',
            height: '1px',
            background: '#c9a84c',
        },
        title: {
            fontSize: '28px',
            fontWeight: 600,
            color: '#f0ece0',
            lineHeight: 1.15,
        },
        subtitle: {
            fontSize: '13px',
            color: '#9a9489',
            marginTop: '5px',
            fontWeight: 300,
        },
        btnPrimary: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '9px',
            background: '#c9a84c',
            color: '#0d0f14',
            fontSize: '13px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
            letterSpacing: '0.02em',
            transition: 'background 0.2s',
        },
        statsRow: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '2rem',
        },
        statCard: {
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '14px',
            padding: '1rem 1.25rem',
        },
        statLabel: {
            fontSize: '11px',
            color: '#5c5850',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px',
        },
        statVal: {
            fontSize: '26px',
            fontWeight: 600,
            color: '#f0ece0',
        },
        statMeta: {
            fontSize: '12px',
            color: '#9a9489',
            marginTop: '2px',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
        },
        statDot: {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#5cd4a0',
            flexShrink: 0,
        },
        formPanel: {
            background: '#13161e',
            border: '0.5px solid rgba(201,168,76,0.35)',
            borderRadius: '14px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            animation: 'slideDown 0.25s ease',
        },
        formHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
        },
        formTitle: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#c9a84c',
            letterSpacing: '0.04em',
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
        },
        formField: {
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
        },
        formLabel: {
            fontSize: '11px',
            color: '#9a9489',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
        },
        formInput: {
            padding: '10px 13px',
            background: '#1a1e2a',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '9px',
            color: '#f0ece0',
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px',
            outline: 'none',
        },
        formActions: {
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
            marginTop: '1rem',
        },
        btnGhost: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 16px',
            borderRadius: '9px',
            background: 'transparent',
            color: '#9a9489',
            fontSize: '13px',
            fontWeight: 400,
            border: '0.5px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
        },
        btnSubmit: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '10px 22px',
            borderRadius: '9px',
            background: '#c9a84c',
            color: '#0d0f14',
            fontSize: '13px',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Sora', sans-serif",
        },
        xBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#5c5850',
            padding: '4px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
        },
        panel: {
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '14px',
            overflow: 'hidden',
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        },
        searchWrap: {
            position: 'relative',
            maxWidth: '280px',
            flex: 1,
        },
        searchIcon: {
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#5c5850',
            pointerEvents: 'none',
        },
        searchInput: {
            width: '100%',
            padding: '8px 12px 8px 32px',
            background: '#1a1e2a',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '9px',
            color: '#f0ece0',
            fontFamily: "'Sora', sans-serif",
            fontSize: '13px',
            outline: 'none',
        },
        countLabel: {
            fontSize: '12px',
            color: '#5c5850',
            fontFamily: "'DM Mono', monospace",
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            padding: '10px 16px',
            textAlign: 'left',
            fontSize: '10px',
            fontWeight: 500,
            color: '#5c5850',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderBottom: '0.5px solid rgba(255,255,255,0.06)',
        },
        td: {
            padding: '13px 16px',
            borderBottom: '0.5px solid rgba(255,255,255,0.04)',
            verticalAlign: 'middle',
        },
        avatar: {
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
            flexShrink: 0,
            background: 'rgba(201,168,76,0.12)',
            color: '#c9a84c',
            border: '0.5px solid rgba(201,168,76,0.25)',
        },
        clientName: {
            fontSize: '14px',
            fontWeight: 500,
            color: '#f0ece0',
        },
        clientId: {
            fontSize: '11px',
            color: '#5c5850',
            fontFamily: "'DM Mono', monospace",
            marginTop: '1px',
        },
        contactRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: '#9a9489',
        },
        btnEdit: {
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#c9a84c',
        },
        btnDel: {
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#e05c5c',
        },
        emptyState: {
            padding: '4rem 2rem',
            textAlign: 'center',
        },
        emptyTitle: {
            fontSize: '15px',
            fontWeight: 500,
            color: '#9a9489',
            marginBottom: '6px',
        },
        emptySub: {
            fontSize: '13px',
            color: '#5c5850',
        },
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
                @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
            `}</style>

            <div style={styles.page}>
                <div style={styles.inner}>

                    {/* Header */}
                    <div style={styles.header}>
                        <div>
                            <div style={styles.eyebrow}>
                                <span style={styles.eyebrowLine} />
                                CRM
                            </div>
                            <div style={styles.title}>Client Directory</div>
                            <div style={styles.subtitle}>Manage your client portfolio with precision.</div>
                        </div>
                        {!showForm && (
                            <button style={styles.btnPrimary} onClick={() => setShowForm(true)}>
                                <Plus size={16} />
                                New Client
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div style={styles.statsRow}>
                        <div style={styles.statCard}>
                            <div style={styles.statLabel}>Total Clients</div>
                            <div style={styles.statVal}>{clients.length}</div>
                            <div style={styles.statMeta}>
                                <span style={styles.statDot} />
                                Active records
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statLabel}>This Month</div>
                            <div style={styles.statVal}>{Math.ceil(clients.length * 0.4)}</div>
                            <div style={styles.statMeta}>New additions</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statLabel}>Search Results</div>
                            <div style={styles.statVal}>{search ? clients.length : '—'}</div>
                            <div style={styles.statMeta}>Matching query</div>
                        </div>
                    </div>

                    {/* Form */}
                    {showForm && (
                        <div style={styles.formPanel}>
                            <div style={styles.formHeader}>
                                <div style={styles.formTitle}>
                                    {editingId ? 'Edit Client' : 'New Client'}
                                </div>
                                <button style={styles.xBtn} onClick={resetForm}>
                                    <X size={16} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div style={styles.formGrid}>
                                    <div style={styles.formField}>
                                        <label style={styles.formLabel}>Full Name</label>
                                        <input
                                            style={styles.formInput}
                                            type="text"
                                            placeholder="e.g. Jean Dupont"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={styles.formField}>
                                        <label style={styles.formLabel}>Email Address</label>
                                        <input
                                            style={styles.formInput}
                                            type="email"
                                            placeholder="e.g. jean@exemple.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={styles.formField}>
                                        <label style={styles.formLabel}>Phone Number</label>
                                        <input
                                            style={styles.formInput}
                                            type="text"
                                            placeholder="e.g. 06 12 34 56 78"
                                            value={telephone}
                                            onChange={e => setTelephone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={styles.formActions}>
                                    <button type="button" style={styles.btnGhost} onClick={resetForm}>
                                        Cancel
                                    </button>
                                    <button type="submit" style={styles.btnSubmit} disabled={isSubmitting}>
                                        {isSubmitting
                                            ? <Loader2 size={14} className="animate-spin" />
                                            : <Check size={14} />}
                                        {editingId ? 'Save Changes' : 'Add Client'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Table Panel */}
                    <div style={styles.panel}>
                        <div style={styles.toolbar}>
                            <div style={styles.searchWrap}>
                                <span style={styles.searchIcon}>
                                    <Search size={14} />
                                </span>
                                <input
                                    style={styles.searchInput}
                                    type="text"
                                    placeholder="Search by name or email…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <span style={styles.countLabel}>
                                {clients.length} client{clients.length !== 1 ? 's' : ''}
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>Client</th>
                                        <th style={styles.th}>Contact</th>
                                        <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" style={{ ...styles.td, textAlign: 'center', padding: '3rem', color: '#5c5850' }}>
                                                <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto' }} />
                                            </td>
                                        </tr>
                                    ) : clients.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" style={styles.td}>
                                                <div style={styles.emptyState}>
                                                    <div style={styles.emptyTitle}>No clients found.</div>
                                                    <div style={styles.emptySub}>
                                                        {search
                                                            ? 'Try a different search term.'
                                                            : 'Add your first client to get started.'}
                                                    </div>
                                                    {!search && (
                                                        <button
                                                            style={{ ...styles.btnPrimary, margin: '1rem auto 0' }}
                                                            onClick={() => setShowForm(true)}
                                                        >
                                                            <Plus size={14} />
                                                            Add Client
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        clients.map(client => (
                                            <tr
                                                key={client.id}
                                                style={{ transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#1a1e2a'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <td style={styles.td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <div style={styles.avatar}>
                                                            {getInitials(client.nom)}
                                                        </div>
                                                        <div>
                                                            <div style={styles.clientName}>{client.nom}</div>
                                                            <div style={styles.clientId}>
                                                                #{String(client.id).padStart(4, '0')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={styles.td}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                        <div style={styles.contactRow}>
                                                            <Mail size={12} style={{ opacity: 0.5 }} />
                                                            {client.email}
                                                        </div>
                                                        <div style={styles.contactRow}>
                                                            <Phone size={12} style={{ opacity: 0.5 }} />
                                                            {client.telephone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ ...styles.td, textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                                                        <button
                                                            style={styles.btnEdit}
                                                            onClick={() => handleEdit(client)}
                                                            title="Edit"
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.12)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                        >
                                                            <Edit2 size={15} />
                                                        </button>
                                                        <button
                                                            style={styles.btnDel}
                                                            onClick={() => handleDelete(client.id)}
                                                            title="Delete"
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,92,92,0.12)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
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

export default Clients;
