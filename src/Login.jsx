import { useState } from 'react';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === 'Sbahrms' && password === 'Hrms12345'|| username === 'careers' && password === 'careers5500') {
        window.location.href = "/forms"
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 500);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      padding: '20px'
    },
    loginBox: {
      backgroundColor: '#000000',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(231, 0, 11, 0.3)',
      border: '1px solid #e7000b',
      padding: '40px',
      width: '100%',
      maxWidth: '400px'
    },
    logo: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    lockIcon: {
      width: '60px',
      height: '60px',
      margin: '0 auto 15px',
      backgroundColor: '#e7000b',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: 0
    },
    subtitle: {
      fontSize: '14px',
      color: '#cccccc',
      marginTop: '5px'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#ffffff'
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      width: '100%',
      padding: '12px 40px 12px 40px',
      border: '1px solid #333333',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box',
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    },
    inputIcon: {
      position: 'absolute',
      left: '12px',
      color: '#cccccc'
    },
    eyeIcon: {
      position: 'absolute',
      right: '12px',
      cursor: 'pointer',
      color: '#cccccc',
      display: 'flex',
      alignItems: 'center'
    },
    error: {
      backgroundColor: '#330000',
      color: '#ff6b6b',
      padding: '10px',
      borderRadius: '6px',
      fontSize: '14px',
      textAlign: 'center',
      border: '1px solid #e7000b'
    },
    button: {
      padding: '12px',
      backgroundColor: '#e7000b',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '10px'
    },
    buttonDisabled: {
      backgroundColor: '#666666',
      cursor: 'not-allowed'
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '12px',
      color: '#999999'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.logo}>
          <div style={styles.lockIcon}>
            <Lock size={30} />
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Please login to your account</p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIcon}>
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                disabled={isLoading}
                onFocus={(e) => e.target.style.borderColor = '#e7000b'}
                onBlur={(e) => e.target.style.borderColor = '#333333'}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <div style={styles.inputIcon}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                disabled={isLoading}
                onFocus={(e) => e.target.style.borderColor = '#e7000b'}
                onBlur={(e) => e.target.style.borderColor = '#333333'}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
              <div 
                style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            onClick={handleSubmit}
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonDisabled : {})
            }}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = '#c00009';
            }}
            onMouseOut={(e) => {
              if (!isLoading) e.currentTarget.style.backgroundColor = '#e7000b';
            }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div style={styles.footer}>
          © 2024 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;