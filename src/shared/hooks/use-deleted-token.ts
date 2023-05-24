import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import { LOCAL_STORAGE_KEYS } from 'shared/lib/localStorage/constants';
import { auth, signOut } from 'firebase';

export const useDeletedToken = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const deletedTokenHandler = () => {
      if (!window.localStorage.getItem(LOCAL_STORAGE_KEYS.USER)) {
        signOut(auth)
          .catch(() => {})
          .finally(() => navigate(ROUTES.home, { replace: true }));
      }
    };

    window.addEventListener('storage', deletedTokenHandler);
    return () => {
      window.removeEventListener('storage', deletedTokenHandler);
    };
  }, [navigate]);
};
