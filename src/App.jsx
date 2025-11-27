import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {asyncGetOwnProfile} from './features/auth/authSlice';
import {getToken} from './services/api';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token) {
      dispatch(asyncGetOwnProfile()).finally(() => {
        setIsInitializing(false);
      });
    } else {
      setTimeout(() => {
        setIsInitializing(false);
      }, 0);
    }
  }, [dispatch]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {authUser && <Header />}
      <main>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/threads/:id"
            element={
              authUser ? <DetailPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-thread"
            element={
              authUser ? <AddThreadPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/leaderboard"
            element={
              authUser ? (
                <LeaderboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !authUser ? <LoginPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/register"
            element={
              !authUser ? <RegisterPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
