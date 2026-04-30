import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Identifiants incorrects. Veuillez réessayer.');
        } finally {
            setIsSubmitting(false);
        }
    };
 
    const s = {
        page: {
            minHeight: '100vh',
            background: '#0d0f14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Sora', sans-serif",
            padding: '2rem 1rem',
        },
        card: {
            width: '100%',
            maxWidth: '420px',
            background: '#13161e',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '2.5rem 2rem',
        },
        logoWrap: {
            width: '48px', height: '48px',
            borderRadius: '13px',
            background: 'rgba(201,168,76,0.12)',
            border: '0.5px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
        },
        eyebrow: {
            fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#c9a84c',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', marginBottom: '10px',
        },
        eyebrowLine: {
            display: 'inline-block', width: '14px', height: '1px', background: '#c9a84c',
        },
        title: {
            fontSize: '24px', fontWeight: 600, color: '#f0ece0',
            textAlign: 'center', lineHeight: 1.2, marginBottom: '6px',
        },
        subtitle: {
            fontSize: '13px', color: '#9a9489', textAlign: 'center',
            fontWeight: 300, marginBottom: '2rem',
        },
        errorBox: {
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: 'rgba(224,92,92,0.08)',
            border: '0.5px solid rgba(224,92,92,0.3)',
            borderRadius: '10px',
            padding: '12px 14px',
            marginBottom: '1.25rem',
        },
        errorText: {
            fontSize: '13px', color: '#e05c5c', lineHeight: 1.5,
        },
        fieldWrap: { marginBottom: '14px' },
        label: {
            fontSize: '11px', fontWeight: 500, color: '#9a9489',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            display: 'block', marginBottom: '7px',
        },
        inputWrap: { position: 'relative' },
        inputIcon: {
            position: 'absolute', left: '12px', top: '50%',
            transform: 'translateY(-50%)', color: '#5c5850',
            pointerEvents: 'none', display: 'flex',
        },
        input: {
            width: '100%', padding: '11px 13px 11px 38px',
            background: '#1a1e2a',
            border: '0.5px solid rgba(255,255,255,0.06)',
            borderRadius: '10px', color: '#f0ece0',
            fontFamily: "'Sora', sans-serif", fontSize: '13px',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s',
        },
        divider: {
            height: '0.5px', background: 'rgba(255,255,255,0.05)',
            margin: '1.5rem 0',
        },
        btnSubmit: {
            width: '100%', padding: '12px',
            borderRadius: '10px', background: '#c9a84c', color: '#0d0f14',
            fontSize: '13px', fontWeight: 600, border: 'none',
            cursor: 'pointer', fontFamily: "'Sora', sans-serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'background 0.2s, opacity 0.2s',
            letterSpacing: '0.02em',
        },
        footer: {
            textAlign: 'center', marginTop: '1.5rem',
            fontSize: '13px', color: '#5c5850',
        },
        footerLink: {
            color: '#c9a84c', fontWeight: 500, textDecoration: 'none',
        },
    };
 
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');
                @keyframes spin { to { transform: rotate(360deg); } }
                .login-input:focus { border-color: rgba(201,168,76,0.4) !important; }
                .login-btn:hover:not(:disabled) { background: #e8c97a !important; }
                .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .register-link:hover { color: #e8c97a !important; }
            `}</style>
 
            <div style={s.page}>
                <div style={s.card}>
 
                    {/* Logo */}
                    <div style={s.logoWrap}>
                        <LogIn size={20} style={{ color: '#c9a84c' }} />
                    </div>
 
                    {/* Heading */}
                    <div style={s.eyebrow}>
                        <span style={s.eyebrowLine} />
                        SGC
                        <span style={s.eyebrowLine} />
                    </div>
                    <div style={s.title}>Bienvenue</div>
                    <div style={s.subtitle}>Connectez-vous à votre espace gestion</div>
 
                    {/* Error */}
                    {error && (
                        <div style={s.errorBox}>
                            <AlertCircle size={15} style={{ color: '#e05c5c', flexShrink: 0, marginTop: '1px' }} />
                            <span style={s.errorText}>{error}</span>
                        </div>
                    )}
 
                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div style={s.fieldWrap}>
                            <label style={s.label}>Adresse Email</label>
                            <div style={s.inputWrap}>
                                <span style={s.inputIcon}><Mail size={15} /></span>
                                <input
                                    className="login-input"
                                    style={s.input}
                                    type="email"
                                    placeholder="nom@exemple.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
 
                        <div style={s.fieldWrap}>
                            <label style={s.label}>Mot de passe</label>
                            <div style={s.inputWrap}>
                                <span style={s.inputIcon}><Lock size={15} /></span>
                                <input
                                    className="login-input"
                                    style={s.input}
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
 
                        <div style={s.divider} />
 
                        <button
                            type="submit"
                            className="login-btn"
                            style={s.btnSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                                : <LogIn size={16} />}
                            Se connecter
                        </button>
                    </form>
 
                    {/* Footer */}
                    <div style={s.footer}>
                        Pas encore de compte ?{' '}
                        <Link to="/register" className="register-link" style={s.footerLink}>
                            S'inscrire gratuitement
                        </Link>
                    </div>
 
                </div>
            </div>
        </>
    );
};
 
export default Login;