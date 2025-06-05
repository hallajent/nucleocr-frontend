const Header = ({ email }) => {
  const isAdmin = email === 'admin@nucleocr.com';
  const welcomeMessage = isAdmin
    ? 'Bienvenue admin'
    : 'Bienvenue Dr Hallaj';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        textAlign: 'center'
      }}
    >
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
        NucleoCR AI
      </h1>
      <p style={{ fontSize: '14px', color: '#6b7280' }}>
        Votre assistant IA pour la rédaction de compte rendu
      </p>
      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
        {welcomeMessage}
      </p>
    </div>
  );
};

export default Header;

