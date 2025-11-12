import { useState } from 'react';
import { FileText, ClipboardList } from 'lucide-react';
import AppointmentLetterForm from "./appointment";
import NDA from "./NDA";

function Forms() {
  const [activeForm, setActiveForm] = useState('appointment');

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      backgroundColor: '#000000',
      position: 'relative'
    },
    header: {
      backgroundColor: '#000000',
      borderBottom: '2px solid #e7000b',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      flexShrink: 0,
      zIndex: 100
    },
    navButtons: {
      display: 'flex',
      gap: '12px',
      flex: 1
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      border: '2px solid #e7000b',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.2s',
      color: '#ffffff',
      backgroundColor: 'transparent'
    },
    navButtonActive: {
      backgroundColor: '#e7000b',
      color: '#ffffff'
    },
    formContent: {
      flex: 1,
      overflow: 'auto',
      padding: '0',
      minHeight: '0'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with Navigation */}
      <div style={styles.header}>
        <div style={styles.navButtons}>
          <button
            onClick={() => setActiveForm('appointment')}
            style={{
              ...styles.navButton,
              ...(activeForm === 'appointment' ? styles.navButtonActive : {})
            }}
            onMouseOver={(e) => {
              if (activeForm !== 'appointment') {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }
            }}
            onMouseOut={(e) => {
              if (activeForm !== 'appointment') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <FileText size={18} />
            <span>Appointment Letter</span>
          </button>

          <button
            onClick={() => setActiveForm('NDA')}
            style={{
              ...styles.navButton,
              ...(activeForm === 'NDA' ? styles.navButtonActive : {})
            }}
            onMouseOver={(e) => {
              if (activeForm !== 'NDA') {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
              }
            }}
            onMouseOut={(e) => {
              if (activeForm !== 'NDA') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <ClipboardList size={18} />
            <span>NDA</span>
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div style={styles.formContent}>
        {activeForm === 'appointment' ? <AppointmentLetterForm /> : <NDA />}
      </div>
    </div>
  );
}

export default Forms;
