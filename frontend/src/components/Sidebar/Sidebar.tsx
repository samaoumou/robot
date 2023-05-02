import './Sidebar.css'
import imgSerre from '../../assets/serre.png'
import {Link, useLocation, useNavigate} from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation();
    console.log(location.pathname)
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  
  return(
    <div className='w-1/6 top-8 left-16 bg-white absolute rounded-lg drop-shadow-lg'>
          <Link to={'/dashboard'}>
            <div className='flex flex-row text-emerald-600 justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 m-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <h1 className='text-2xl font-medium m-2'>Dashboard</h1>
            </div>
          </Link>
        <Link to={'/dashboard'}>
            <div className='flex justify-center'>
              <img className='w-44 h-44' src={imgSerre} alt="image serre" />
            </div>
        </Link>
        <Link to="modificationProfil">
          <div className='flex justify-center m-6'>
            <button className={`${location.pathname === "/dashboard/modificationProfil" ? 'border-2 border-emerald-600': ''} bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
              </svg>
              <span className='ml-2'>Mon compte</span>
            </button>
          </div>
        </Link>
        <Link to="history">
          <div className='flex justify-center m-6'>
            <button className={`${location.pathname === "/dashboard/history" ? 'border-2 border-emerald-600': ''} bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              <span className='ml-2'>Historique</span>
            </button>
          </div>
        </Link>
        <Link to="parametrage">
          <div className='flex justify-center m-6'>
              <button className={`${location.pathname === "/dashboard/parametrage" ? 'border-2 border-emerald-600': ''} bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className='ml-2'>Paramétres</span>
              </button>
            </div>
        </Link>
        <Link to="sauvegarde">
        <div className='flex justify-center m-6'>
          <button className={`${location.pathname === "/dashboard/sauvegarde" ? 'border-2 border-emerald-600': ''} bg-emerald-100 hover:bg-emerald-600 hover:text-white py-3 px-4 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span className='ml-2'>Sauvegardes</span>
          </button>
        </div>
        </Link>
        <div className='flex justify-center text-white'>
          <button onClick={() => logout()} className="bg-emerald-600 hover:text-black hover:bg-emerald-100 py-3 mt-24 px-6 w-44 h-12 font-medium rounded-lg drop-shadow-lg flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span className='ml-2'>Deconnexion</span>
          </button>
        </div>
    </div>
  )
  
  }
  
  export default Sidebar