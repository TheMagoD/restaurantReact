import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TokenExpirationWatcher() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('token_expiration');

      if (token && expiration && Date.now() > Number(expiration)) {
        localStorage.clear();
        toast.warning("Tu sesión ha expirado. Inicia sesión nuevamente.");
        navigate('/', { replace: true });
      }
    }, 5000); // ⏱ verifica cada 5 segundos

    return () => clearInterval(interval); // 🔄 limpia el intervalo cuando se desmonta
  }, [navigate]);

  return null;
}
