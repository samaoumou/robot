import './Sidebar.css'
import voiture2 from '../../assets/voiture2.jpeg'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import infos from '../../assets/infos.png'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation();
    console.log(location.pathname)
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  
  return(
    <div className='w-1/6 top-8 left-16 bg-blue-800/25 absolute rounded-lg drop-shadow-lg'>
          <Link to={'/dashboard'}>
            <div className='flex flex-row text-white justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 m-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <h1 className='text-white font-medium m-2'>Dashboard</h1>
            </div>
          </Link>
        <Link to={'/dashboard'}>
            <div className='flex justify-center'>
              <img className='w-44 h-44' src={voiture2} alt="image serre" />
            </div>
        </Link>
        <Link to="modificationProfil">
          <div className='flex justify-center m-6'>
            <button className={`${location.pathname === "/dashboard/modificationProfil" ? 'border-2 border-emerald-600': ''} bg-white hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
              <span className='ml-2'>Mon compte</span>
            </button>
          </div>
        </Link>
        <Link to="history">
          <div className='flex justify-center m-6'>
            <button className={`${location.pathname === "/dashboard/history" ? 'border-2 border-emerald-600': ''} bg-white hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
            <img className='w-10 h-8 mb-1 ' src={infos} alt="" />
              <span className='ml-2'>Infos</span>
            </button>
          </div>
        </Link>
        <div className='flex justify-center text-white'>
          <button onClick={() => logout()} className="bg-white hover:text-black hover:bg-emerald-600 py-3 mt-24 px-6 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span className='ml-2 text-black'>Deconnexion</span>
          </button>
        </div>
    </div>
  )
  
  }
  
  export default Sidebar