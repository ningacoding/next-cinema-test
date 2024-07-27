'use client';
import {createContext, SetStateAction, useEffect, useState} from 'react';
import useHttp from '@/utils/http';
import Loader from '@/components/loader';
import {RoleEnum} from '@/constants/role.enum';

export const AuthContext = createContext({
  authEmail: null,
  hasLoggedIn: false,
  isAdmin: false,
});

// @ts-ignore
export const AuditoriumsContext = createContext({
  selectedAuditoriumId: 1,
  setSelectedAuditorium: (value: number | undefined) => {
  },
});

export function Auditoriums({children}: any) {
  let accessToken;
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  const [hasLoggedIn, setHasLoggedIn] = useState(!!accessToken);
  const {data, isLoading} = useHttp('/users/me');
  const [authEmail, setAuthEmail] = useState(data?.email);
  const [isAdmin, setIsAdmin] = useState(data?.roleId === RoleEnum.Admin);

  const [selectedAuditoriumId, setSelectedProvidersId] = useState(1);
  const setSelectedAuditorium: any = (value: SetStateAction<any>) => setSelectedProvidersId(value);

  useEffect(() => {
    setAuthEmail(data?.email);
  }, [data?.email]);

  useEffect(() => {
    setIsAdmin(data?.roleId === RoleEnum.Admin);
  }, [data?.roleId]);

  if (isLoading) {
    return <Loader size={'large'}
                   containerStyle={'h-full'}/>;
  }
  return (
    <AuthContext.Provider value={{
      hasLoggedIn,
      authEmail,
      isAdmin,
    }}>
      <AuditoriumsContext.Provider value={{
        selectedAuditoriumId,
        setSelectedAuditorium,
      }}>
        {children}
      </AuditoriumsContext.Provider>
    </AuthContext.Provider>
  );
}
