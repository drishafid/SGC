import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Calendar, Plus, Edit2, Trash2, X, Check, Loader2, Clock, User, FileText } from 'lucide-react';
 
const RendezVous = () => {
    const [rdvs, setRdvs] = useState([]);
    const [clients, setClients] = useState([]);
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');
    const [clientId, setClientId] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
 
    useEffect(() => {
        fetchRdvs();
        fetchClients();
    }, []);
 
    const fetchRdvs = async () => {
        try {
            const response = await api.get('/rendez-vous');
            setRdvs(response.data);
        } catch (error) {
            console.error('Error fetching rdvs', error);
        } finally {
            setLoading(false);
        }
    };
 
    const fetchClients = async () => {
        try {
            const response = await api.get('/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients', error);
        }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = { date, note, client_id: clientId };
            if (editingId) {
                await api.put(`/rendez-vous/${editingId}`, payload);
            } else {
                await api.post('/rendez-vous', payload);
            }
            resetForm();
            fetchRdvs();
        } catch (error) {
            alert("Erreur lors de l'enregistrement");
        } finally {
            setIsSubmitting(false);
        }
    };
 
    const handleEdit = (rdv) => {
        const formattedDate = new Date(rdv.date).toISOString().slice(0, 16);
        setDate(formattedDate);
        setNote(rdv.note || '');
        setClientId(rdv.client_id);
        setEditingId(rdv.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
 
    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce rendez-vous ?')) {
            await api.delete(`/rendez-vous/${id}`);
            fetchRdvs();
        }
    };
 
    const resetForm = () => {
        setDate('');
        setNote('');
        setClientId('');
        setEditingId(null);
        setShowForm(false);
    };
 
    const getInitials = (name) =>
        name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';
 
    const isPast = (dateStr) => new Date(dateStr) < new Date();
 
    const s = {
        page: {
            minHeight: '100vh',
            background: '#0d0f14',
            color: '#f0ece0',
            fontFamily: "'Sora', sans-serif",
            padding: '2rem 1.5rem 4rem',
        },
        inner: { maxWidth: '900px', margin: '0 auto' },
        header: {
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '2.5rem',
        },
        eyebrow: {
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#c9a84c',
            marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px',
        },
        eyebrowLine: { display: 'inline-block', width: '18px', height: '1px', background: '#c9a84c' },
        title: { fontSize: '28px', fontWeight: 600, color: '#f0ece0', lineHeight: 1.15 },
        subtitle: { fontSize: '13px', color: '#9a9489', marginTop: '5px', fontWeight: 300 },
        btnPrimary: {
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '9px',
            background: '#c9a84c', color: '#0d0f14',
            fontSize: '13px', fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: "'Sora', sans-serif",
            letterSpacing: '0.02em',
        },
        formPanel: {
            background: '#13161e',
            border: '0.5px solid rgba(201,168,76,0.35)',
            borderRadius: '14px', padding: '1.5rem',
            marginBottom: '1.5rem',
            animation: 'slideDown 0.25s ease',
        },
        formHeader: {
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '1.25rem',
        },
        formTitle: { fontSize: '14px', fontWeight: 600, color: '#c9a84c', letterSpacing: '0.04em' },
        formGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
        formField: { display: 'flex', flexDirection: 'column', gap: '6px' },
        formLabel: {
            fontSize: '11px', color: '#9a9489', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '5px',
        },
        formInput: {
            padding: '10px 13px', background: '#1a1e2a',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '9px', color: '#f0ece0',
            fontFamily: "'Sora', sans-serif", fontSize: '13px', outline: 'none',
            width: '100%', boxSizing: 'border-box',
        },
        formSelect: {
            padding: '10px 13px', background: '#1a1e2a',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '9px', color: '#f0ece0',
            fontFamily: "'Sora', sans-serif", fontSize: '13px', outline: 'none',
            width: '100%', boxSizing: 'border-box', appearance: 'none', cursor: 'pointer',
        },
        formActions: { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' },
        btnGhost: {
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '9px 16px', borderRadius: '9px',
            background: 'transparent', color: '#9a9489',
            fontSize: '13px', fontWeight: 400,
            border: '0.5px solid rgba(255,255,255,0.06)',
            cursor: 'pointer', fontFamily: "'Sora', sans-serif",
        },
        btnSubmit: {
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            padding: '10px 22px', borderRadius: '9px',
            background: '#c9a84c', color: '#0d0f14',
            fontSize: '13px', fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: "'Sora', sans-serif",
        },
        xBtn: {
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#5c5850', padding: '4px', borderRadius: '6px',
            display: 'flex', alignItems: 'center',
        },
        panel: {
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '14px', overflow: 'hidden',
        },
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
        calIconWrap: {
            width: '34px', height: '34px', borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(100,160,240,0.1)', flexShrink: 0,
        },
        dateText: {
            fontSize: '13px', fontWeight: 500, color: '#f0ece0',
            fontFamily: "'DM Mono', monospace",
        },
        pastBadge: {
            fontSize: '10px', color: '#5c5850', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px',
        },
        avatar: {
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 600, flexShrink: 0,
            background: 'rgba(201,168,76,0.12)', color: '#c9a84c',
            border: '0.5px solid rgba(201,168,76,0.25)',
        },
        clientName: { fontSize: '13px', color: '#f0ece0', fontWeight: 400 },
        noteText: {
            fontSize: '12px', color: '#5c5850', fontStyle: 'italic',
            maxWidth: '200px', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        },
        btnEdit: {
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer', color: '#c9a84c',
        },
        btnDel: {
            width: '32px', height: '32px', borderRadius: '8px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', cursor: 'pointer', color: '#e05c5c',
        },
        emptyState: { padding: '4rem 2rem', textAlign: 'center' },
        emptyTitle: { fontSize: '15px', fontWeight: 500, color: '#9a9489', marginBottom: '6px' },
        emptySub: { fontSize: '13px', color: '#5c5850' },
    };
 
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
                @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .rdv-input:focus { border-color: rgba(201,168,76,0.4) !important; }
                .rdv-row:hover { background: #1a1e2a !important; }
                .rdv-row:hover .rdv-actions { opacity: 1 !important; }
                .rdv-btn-edit:hover { background: rgba(201,168,76,0.12) !important; }
                .rdv-btn-del:hover { background: rgba(224,92,92,0.12) !important; }
                .rdv-btn-primary:hover { background: #e8c97a !important; }
                .rdv-btn-submit:hover { background: #e8c97a !important; }
                .rdv-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                input[type="datetime-local"]::-webkit-calendar-picker-indicator { filter: invert(0.4); cursor: pointer; }
            `}</style>
 
            <div style={s.page}>
                <div style={s.inner}>
 
                    {/* Header */}
                    <div style={s.header}>
                        <div>
                            <div style={s.eyebrow}>
                                <span style={s.eyebrowLine} />
                                Agenda
                            </div>
                            <div style={s.title}>Rendez-vous</div>
                            <div style={s.subtitle}>Planifiez et organisez vos rencontres avec les clients.</div>
                        </div>
                        {!showForm && (
                            <button
                                className="rdv-btn-primary"
                                style={s.btnPrimary}
                                onClick={() => setShowForm(true)}
                            >
                                <Calendar size={16} />
                                Nouveau RDV
                            </button>
                        )}
                    </div>
 
                    {/* Form */}
                    {showForm && (
                        <div style={s.formPanel}>
                            <div style={s.formHeader}>
                                <div style={s.formTitle}>
                                    {editingId ? 'Modifier le rendez-vous' : 'Planifier un rendez-vous'}
                                </div>
                                <button style={s.xBtn} onClick={resetForm}>
                                    <X size={16} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div style={s.formGrid}>
                                    <div style={s.formField}>
                                        <label style={s.formLabel}>
                                            <User size={11} /> Client
                                        </label>
                                        <select
                                            className="rdv-input"
                                            style={s.formSelect}
                                            value={clientId}
                                            onChange={e => setClientId(e.target.value)}
                                            required
                                        >
                                            <option value="">Choisir un client</option>
                                            {clients.map(c => (
                                                <option key={c.id} value={c.id}>{c.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={s.formField}>
                                        <label style={s.formLabel}>
                                            <Clock size={11} /> Date et Heure
                                        </label>
                                        <input
                                            className="rdv-input"
                                            style={s.formInput}
                                            type="datetime-local"
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={s.formField}>
                                        <label style={s.formLabel}>
                                            <FileText size={11} /> Note
                                        </label>
                                        <input
                                            className="rdv-input"
                                            style={s.formInput}
                                            type="text"
                                            placeholder="ex: Présentation projet"
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div style={s.formActions}>
                                    <button type="button" style={s.btnGhost} onClick={resetForm}>
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="rdv-btn-submit"
                                        style={s.btnSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                            : <Check size={14} />}
                                        {editingId ? 'Mettre à jour' : 'Confirmer le RDV'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
 
                    {/* Table */}
                    <div style={s.panel}>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={s.table}>
                                <thead>
                                    <tr>
                                        <th style={s.th}>Date &amp; Heure</th>
                                        <th style={s.th}>Client</th>
                                        <th style={s.th}>Note</th>
                                        <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" style={{ ...s.td, textAlign: 'center', padding: '3rem' }}>
                                                <Loader2 size={24} style={{ color: '#c9a84c', animation: 'spin 1s linear infinite', margin: '0 auto', display: 'block' }} />
                                            </td>
                                        </tr>
                                    ) : rdvs.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" style={s.td}>
                                                <div style={s.emptyState}>
                                                    <Clock size={36} style={{ color: '#5c5850', opacity: 0.3, margin: '0 auto 12px', display: 'block' }} />
                                                    <div style={s.emptyTitle}>Aucun rendez-vous planifié.</div>
                                                    <div style={s.emptySub}>Créez votre premier RDV pour commencer.</div>
                                                    <button
                                                        style={{ ...s.btnPrimary, margin: '1rem auto 0' }}
                                                        onClick={() => setShowForm(true)}
                                                    >
                                                        <Calendar size={14} />
                                                        Planifier un RDV
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        rdvs.map(rdv => (
                                            <tr
                                                key={rdv.id}
                                                className="rdv-row"
                                                style={{ background: 'transparent', transition: 'background 0.15s' }}
                                            >
                                                <td style={s.td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={s.calIconWrap}>
                                                            <Calendar size={15} style={{ color: '#64a0f0' }} />
                                                        </div>
                                                        <div>
                                                            <div style={s.dateText}>
                                                                {new Date(rdv.date).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })}
                                                            </div>
                                                            {isPast(rdv.date) && (
                                                                <div style={s.pastBadge}>passé</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={s.td}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={s.avatar}>
                                                            {getInitials(rdv.client?.nom)}
                                                        </div>
                                                        <span style={s.clientName}>
                                                            {rdv.client ? rdv.client.nom : 'Inconnu'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td style={s.td}>
                                                    <span style={s.noteText}>
                                                        {rdv.note || 'Pas de note'}
                                                    </span>
                                                </td>
                                                <td style={{ ...s.td, textAlign: 'right' }}>
                                                    <div
                                                        className="rdv-actions"
                                                        style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', opacity: 0, transition: 'opacity 0.15s' }}
                                                    >
                                                        <button
                                                            className="rdv-btn-edit"
                                                            style={s.btnEdit}
                                                            onClick={() => handleEdit(rdv)}
                                                            title="Modifier"
                                                        >
                                                            <Edit2 size={15} />
                                                        </button>
                                                        <button
                                                            className="rdv-btn-del"
                                                            style={s.btnDel}
                                                            onClick={() => handleDelete(rdv.id)}
                                                            title="Supprimer"
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
 
export default RendezVous;
 