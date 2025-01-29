import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import {
  UserLogInStatus,
  UserProvider,
  useUser,
} from '../providers/user-provider';
import { useEffect } from 'react';

import Intro from '../pages/intro';
import Home from '../pages/home';

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/log-in" element={<Intro />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

function ProtectedRoute() {
  const { isLoading, status } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (status === UserLogInStatus.loggedOut) {
      navigate('/log-in');
    }
  }, [navigate, status, isLoading]);

  if (isLoading) return null;

  return <Outlet />;
}

export default App;
