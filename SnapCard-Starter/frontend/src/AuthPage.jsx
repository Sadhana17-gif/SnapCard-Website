import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Heart } from 'lucide-react';

export default function AuthPage({ page, onClose, onSuccess, onSwitch }) {
    const isSignup = page === 'signup';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const submit = async event => {
        event.preventDefault();
        setError('');

        if (isSignup && name.trim().length < 2) {
            setError('Please enter your full name.');
            return;
        }
        if (password.length < 6) {
            setError('Password must contain at least 6 characters.');
            return;
        }
        if (isSignup && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/auth/${isSignup ? 'signup' : 'login'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(isSignup
                    ? { name: name.trim(), email: email.trim(), password }
                    : { email: email.trim(), password })
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || data.error || (isSignup
                    ? 'Could not create account. Check the backend setup.'
                    : 'Login failed. Please check your email and password.'));
            }

            onSuccess({
                name: data.name || name.trim() || email.trim().split('@')[0],
                email: data.email || email.trim()
            });
        } catch (err) {
            setError(err instanceof TypeError
                ? 'Cannot connect to the SnapCard backend. In Eclipse, start SnapCardApplication, then check http://localhost:8080/api/products. If products open but signup still fails, the backend auth API needs to be added.'
                : (err.message || 'Something went wrong. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', boxSizing: 'border-box', padding: '14px 15px',
        border: '1px solid #ded8cf', borderRadius: '5px', background: '#fffefa',
        color: '#292721', fontSize: '14px', outline: 'none'
    };
    const labelStyle = { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#403d37' };

    return (
        <section style={{ minHeight: '68vh', padding: '38px 20px 70px', background: '#f8f5ef', display: 'grid', placeItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '980px', minHeight: '560px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', background: '#fffefa', border: '1px solid #eee7dd', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 18px 55px rgba(50, 42, 30, .08)' }}>
                <div style={{ padding: 'clamp(28px, 5vw, 55px)', background: '#e9e1d5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
                    <div>
                        <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-1px' }}><span style={{ display: 'inline-grid', placeItems: 'center', width: '32px', height: '32px', marginRight: '7px', background: '#292721', color: '#fffefa', borderRadius: '4px' }}>S</span>napCard<span style={{ color: '#b27b48' }}>.</span></div>
                        <div style={{ marginTop: '65px', maxWidth: '340px' }}>
                            <span style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: 700, color: '#75634e' }}>YOUR STYLE. YOUR STORY.</span>
                            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(34px, 4vw, 49px)', fontWeight: 400, lineHeight: 1.15, margin: '15px 0' }}>{isSignup ? 'A little more you.' : 'Lovely to see you again.'}</h1>
                            <p style={{ color: '#6e675d', lineHeight: 1.8, fontSize: '14px' }}>{isSignup ? 'Create your SnapCard account and save the styles you love, all in one place.' : 'Sign in to pick up where you left off and find your next everyday favourite.'}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#71675a', fontSize: '13px' }}><Heart size={16} /> Fashion finds, feel-good prices.</div>
                </div>

                <div style={{ padding: 'clamp(28px, 5vw, 55px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <button type="button" onClick={onClose} style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '7px', border: 0, background: 'transparent', padding: '0 0 24px', color: '#5f5a51', cursor: 'pointer', fontSize: '13px' }}><ArrowLeft size={16} /> Back to shopping</button>
                    <h2 style={{ margin: '0 0 8px', fontSize: '30px', fontWeight: 500, letterSpacing: '-.7px' }}>{isSignup ? 'Create account' : 'Welcome back'}</h2>
                    <p style={{ margin: '0 0 27px', color: '#827b70', fontSize: '14px', lineHeight: 1.6 }}>{isSignup ? 'Join SnapCard — it only takes a minute.' : 'Enter your details to sign in to your account.'}</p>

                    <form onSubmit={submit} style={{ display: 'grid', gap: '17px' }}>
                        {isSignup && <div><label style={labelStyle} htmlFor="auth-name">Full name</label><input id="auth-name" style={inputStyle} autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" required /></div>}
                        <div><label style={labelStyle} htmlFor="auth-email">Email address</label><input id="auth-email" style={inputStyle} type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
                        <div><label style={labelStyle} htmlFor="auth-password">Password</label><div style={{ position: 'relative' }}><input id="auth-password" style={{ ...inputStyle, paddingRight: '48px' }} type={showPassword ? 'text' : 'password'} autoComplete={isSignup ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" minLength={6} required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 0, background: 'transparent', cursor: 'pointer', color: '#777166', padding: '4px' }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
                        {isSignup && <div><label style={labelStyle} htmlFor="auth-confirm-password">Confirm password</label><input id="auth-confirm-password" style={inputStyle} type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Enter password again" required /></div>}
                        {error && <p role="alert" style={{ margin: 0, padding: '11px 12px', borderRadius: '5px', background: '#fff0ed', color: '#a33328', fontSize: '13px', lineHeight: 1.5 }}>{error}</p>}
                        <button type="submit" disabled={loading} style={{ width: '100%', marginTop: '3px', padding: '15px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: loading ? '#77736c' : '#292721', color: '#fffefa', border: 0, borderRadius: '5px', fontSize: '14px', fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>{loading ? 'Please wait...' : isSignup ? 'Create my account' : 'Login to SnapCard'} {!loading && <ArrowRight size={17} />}</button>
                    </form>

                    <p style={{ margin: '24px 0 0', textAlign: 'center', fontSize: '13px', color: '#777166' }}>{isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}<button type="button" onClick={() => { setError(''); onSwitch(isSignup ? 'login' : 'signup'); }} style={{ border: 0, background: 'transparent', padding: 0, color: '#8b5c32', fontWeight: 700, cursor: 'pointer' }}>{isSignup ? 'Login' : 'Sign up'}</button></p>
                </div>
            </div>
        </section>
    );
}
