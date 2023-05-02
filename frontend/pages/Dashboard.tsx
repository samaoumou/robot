import { Navigate, Outlet } from "react-router-dom";
import Header from "../src/components/Header/Header";
import Sidebar from "../src/components/Sidebar/Sidebar";
import Mesures from "../src/components/Mesures/Mesures";
import {useEffect, useState} from "react";

const Dashboard = ({ redirectPath ='/'}: { redirectPath?: string}) => {
    const access_token = localStorage.getItem('token');
    const [user, setUser] = useState<any>({nom: 'Nom', prenom: 'Prenom'});

    useEffect(() => {
        fetch('http://localhost:3000/auth/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        }).then(r => r.json())
        .then(data => {
            setUser(data);
        })
    }, [access_token])


    if (!access_token) {
        return <Navigate to={redirectPath} replace />;
    }

  return (
    <div className="h-screen bg-slate-100">
      <Header />
      <Sidebar />
      <div className='absolute overflow-hidden' style={{left: "25%",  width: "66.666667%", top: "48px"}}>
       <Mesures user={user} />
       <div className="mt-5">
        <Outlet />
       </div>
      </div>
    </div>
  );

}

export default Dashboard;
