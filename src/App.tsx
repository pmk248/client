import { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchCandidates } from './store/slices/candidatesSlice';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import { fetchUser } from './store/slices/userSlice';
import Vote from './components/Vote';
import ProtectedRoute from './utils/ProtectedRoutes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const candidates = useAppSelector(s => s.candidates.candidates);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchUser());
  }, [])
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/vote" element={
              <ProtectedRoute>
                <Vote/>
              </ProtectedRoute>
            }/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
