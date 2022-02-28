import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { API } from './src/api';

const checkVote: any = {
  sad: 1,
  ok: 2,
  happy: 3,
};
declare global {
  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
      };
    };
  }
}
const Hello = () => {
  const [check, setCheck] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({
    userName: '',
    userId: '',
    department: '',
  });

  async function getUser() {
    const result = await API.USERS_LIST();
    console.log(result);
    window.electron.store.set('username', result?.data?.[0]?.userName);

    setUser(result?.data?.[0]);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!!check) {
      let ddd: any = {
        vote: checkVote[check],
        userId: user.userId,
        department: user.department,
        date: new Date(),
      };
      postVote(ddd);
    }
  }, [check]);

  async function postVote(params: any) {
    let result = await API.USERS_POST(params);
    console.log(result);
    if (result) {
      setMessage(result?.data?.message);
    }
  }

  return (
    <div>
      <div
        style={{
          marginBottom: '2rem',
          lineHeight: '2rem',
          fontSize: '1.3rem',
          fontFamily: 'Brush Script MT',
        }}
      >
        <p style={{ textAlign: 'center' }}>Merhaba {user?.userName},</p>
        Bugun kendini nasıl hissediyorsun?
      </div>
      <ul className="feedback">
        <li
          onClick={() => setCheck('sad')}
          className={`sad ${check == 'sad' ? 'active' : ''}`}
        >
          <div>
            <svg className="eye left">
              <use xlinkHref="#eye" />
            </svg>
            <svg className="eye right">
              <use xlinkHref="#eye" />
            </svg>
            <svg className="mouth">
              <use xlinkHref="#mouth" />
            </svg>
          </div>
        </li>
        <li
          onClick={() => setCheck('ok')}
          className={`ok ${check == 'ok' ? 'active' : ''}`}
        >
          <div></div>
        </li>
        <li
          onClick={() => setCheck('happy')}
          className={`happy ${check == 'happy' ? 'active' : ''}`}
        >
          <div>
            <svg className="eye left">
              <use xlinkHref="#eye" />
            </svg>
            <svg className="eye right">
              <use xlinkHref="#eye" />
            </svg>
          </div>
        </li>
      </ul>

      <div
        style={{
          marginTop: '1.5rem',
          lineHeight: '2rem',
          fontSize: '1rem',
          textAlign: 'center',
        }}
      >
        {message}
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
          <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1" />
        </symbol>
        <symbol
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 7"
          id="mouth"
        >
          <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5" />
        </symbol>
      </svg>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
