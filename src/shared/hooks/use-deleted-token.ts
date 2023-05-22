import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import { LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage/constants';

export const useDeletedToken = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const deletedTokenHandler = () => {
      if (!window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER)) {
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
