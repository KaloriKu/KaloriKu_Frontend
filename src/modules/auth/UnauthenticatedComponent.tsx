import { useRouter } from 'next/navigation';

const UnauthenticatedComponent = () => {
  const router = useRouter();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const titleStyle = {
    fontSize: '2em',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '10px',
    fontSize: '1em',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>KaloriKu</h1>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={(e) => { router.push('/register') }}>Register</button>
        <button style={buttonStyle} onClick={(e) => { router.push('/login') }}>Login</button>
      </div>
    </div>)
}

export default UnauthenticatedComponent;