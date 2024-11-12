import { useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchCandidates } from './store/slices/candidatesSlice';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import { fetchUser } from './store/slices/userSlice';
import Vote from './components/Vote';

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
        <Register/>
        <Login/>
        <Vote/>
        <Map/>
        {candidates.map(c => <p>{JSON.stringify(c)}</p>)}
      </div>
    </>
  )
}

export default App
