import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/config';

export const useDeletedToken = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const deletedTokenHandler = () => {
      if (!window.localStorage.getItem('persist:graphiql')) {
        navigate(ROUTES.home, { replace: true });
        window.location.reload();
      }
    };

    window.addEventListener('storage', deletedTokenHandler);
    return () => {
      window.removeEventListener('storage', deletedTokenHandler);
    };
  }, [navigate]);
};
