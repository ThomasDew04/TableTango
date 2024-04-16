import small from '../images/logo-small.png';

export default function Loader({ loading }: { loading: boolean }) {
    if (loading) {
      return (
        <div className="loading-container">
            <img src={small} alt='small_logo' />
            <p className='center'>Loading...</p>
        </div>
      );
    }
  
    return null;
  }