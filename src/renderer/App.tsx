
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { API } from './src/api';

//let dateInfo=new Date(moment().format('MMMM Do YYYY, h:mm:ss'));

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
    sicilNo:'',
    firstName: '',
    divisionName: '',
    unitName: '',
    meslekAd:'',
    id:null,
  });
  // const [userVote, setUserVote]=useState<any>({
    
  //   department:'',
  //   section:'',
  //   Unit:'',
  //   vote:'',
  //   userId:'',
  //   date:null

  // })

  const [userInfo, setUserInfo]=useState({
    UserId:window.electron.store.get('osUser')||""
  })


  console.log(window.electron.store.get('osUser'));
  const [userIdFromData,setUserIdFromdata]=useState({
    id:null,
    userId:''
  });
    
  async function getUserId() {
    const result = await API.USERS_INFOLIST();
    setUserIdFromdata(result?.data?.[0]);
    console.log(result?.data?.[0]);
    
    if (result) {
      setMessage(result?.data?.message);
    }

  }
  useEffect(() => {
<<<<<<< HEAD
    let voteAmCheck = new Date(window?.electron?.store?.get('date'));
    console.log(voteAmCheck);

    let ddd: any = {};
    if (!!check && voteAmCheck?.getHours() < 13) {
      ddd = {
        voteBeforeAm: checkVote[check],
        userId: user.userId,
        department: user.department,
        date: new Date(),
        voteAfterAm: null,
      };
    } else if (!!check && voteAmCheck?.getHours() > 13) {
      ddd = {
        voteAfterAm: checkVote[check],
        userId: user.userId,
        date: new Date(),
      };
    }
    if (!!check) postVote(ddd);
  }, [check]);

  useEffect(() => {
    console.log(window.electron.store.get('date'));
  }, [window.electron.store.get('zaman')]);

  async function postVote(params: any) {
    let result = await API.USERS_POST(params);
    console.log(result);
    if (result) {
=======
    getUserId();
      
  },[]);


  async function postUserInfo(userInfo:any) {
    const result=await API.USERS_POSTINFO(userInfo);
    setUserInfo(result?.data?.[0]);
    console.log(userInfo);
    if(result){
      setMessage(result.data?.message)
    }
  }
   
  
   useEffect(() => {
    postUserInfo(userInfo);
      
  },[]);


  

  async function getUserFromBankData(){
    const result=await API.USERS_LIST();
    setUser({
      divisionName:result?.divisonName,
      firstName:result?.firstName,
      sicilNo:result?.sicilNo,
      meslekAd:result?.meslekAd,
      unitName:result?.unitName,
      id:null,


    });
    console.log(user);
    // window.electron.store.set('firstname',result?.data?.firstname)
    
    if(result){
>>>>>>> new
      setMessage(result?.data?.message);
    }
  }

  useEffect(() => {
    getUserFromBankData();

  },[]);


  
  
  async function postVote(params:any) {
    const result=await API.USERS_POST(params);
    if(result){
      console.log(result)
      setMessage(result?.data?.message)
    }
  }

 

  useEffect(() => {
    let postData:any={};
     
    if(!!check){
      postData={
    department:user.divisionName,
    section:user.meslekAd,
    Unit:user.unitName,
    vote:checkVote[check],
    userId:userIdFromData.id,
    
      }
    }
      if(!!check) postVote(postData);
  },[check]);


  
  return (
    <div>
      <div
        style={{
          marginBottom: '2rem',
          lineHeight: '2rem',
          fontSize: '1.3rem',
<<<<<<< HEAD
          fontFamily: 'Brush Script MT',
=======
          fontFamily: 'sans-serif',
>>>>>>> new
          textAlign: 'center',
        }}
      >
        <span
          style={{
<<<<<<< HEAD
            textAlign: 'center',
          }}
        >
          Merhaba {user?.userName},
=======
            textAlign: 'center', fontFamily:'sans-serif'
          }}
        >
          Merhaba {window.electron.store.get('firstname')},
>>>>>>> new
        </span>
        <br></br>
        Bugün kendini nasıl hissediyorsun?
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
