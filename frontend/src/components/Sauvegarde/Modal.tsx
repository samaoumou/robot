import { useState } from 'react'
import { Plante } from '../../Models/plante'
import Success from './Success'
import imgTomate from '../../assets/tomate.png'
import imgAloevera from '../../assets/aloevera.png'
import imgNana from '../../assets/nana.png'

const Modal = ({ show, setShow, setRefreshData, data , plantes}: {
  show: boolean,
  setShow: any,
  data: Plante,
  plantes: Plante[] 
  setRefreshData: (v: boolean) => void}) => {
  const [showM, setShowM] = useState<boolean>(false)
  const [showM1, setShowM1] = useState<boolean>(false)

  const appliquer = () => {
    plantes.forEach(plante => {
      if (plante.nomPlante !== data.nomPlante) {
        fetch('http://localhost:3000/plantes/' + plante._id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({ "etat": false })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          })
      }
    })
    fetch('http://localhost:3000/plantes/' + data._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ "etat": true })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setShow(false);
        setRefreshData(true);
        // setShowM1(true)
        // setTimeout(() => {
        //   setShowM1(false)
        // }, 3000);
      })
  }

  const desactive = () => {
    fetch('http://localhost:3000/plantes/' + data._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ "etat": false })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setShow(false)
        setRefreshData(true);
      })
  }

  return (
    <div className={`relative ${!show ? 'hidden' : ''} z-10`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <button onClick={() => { setShow(false) }} className='absolute' style={{ left: "90%", top: "-35%" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="30" height="30"
                    viewBox="0 0 50 50">
                    <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 16.707031 15.292969 L 15.292969 16.707031 L 23.585938 25 L 15.292969 33.292969 L 16.707031 34.707031 L 25 26.414062 L 33.292969 34.707031 L 34.707031 33.292969 L 26.414062 25 L 34.707031 16.707031 L 33.292969 15.292969 L 25 23.585938 L 16.707031 15.292969 z"></path>
                  </svg>
                </button>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full flex flex-col gap-4 justify-center items-center">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    {data.nomPlante === 'Tomate' && <img src={imgTomate} className="w-16 h-16" alt="" />}
                    {data.nomPlante === 'Nana' && <img src={imgNana} className="w-16 h-16" alt="" />}
                    {data.nomPlante === 'Aloe vera' && <img src={imgAloevera} className="w-16 h-16" alt="" />}
                    <span className='text-xl'>{data.nomPlante}</span>
                  </h3>
                  <hr />
                  <div className="mt-2 flex flex-col gap-4 ">
                    <p className="text-gray-800 text-lg">
                      <span><span className="font-bold">Nombre d'arrosage:</span> {data.nombreArrosage}</span>
                    </p>
                    <p className="text-lg text-gray-800">
                      <span><span className="font-bold">Heure d'arrosage:</span> {data.heureArrosage}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {data.etat === false && <button onClick={() => {
                  appliquer()
                }} type="button" className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold
                 text-white shadow-sm hover:bg-emerald-500 sm:ml-3 sm:w-auto">
                    Appliquer
                  </button>
              }
              {data.etat === true &&
                <button onClick={() => { desactive() }} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-600 sm:mt-0 sm:w-auto">
                  Désactiver
                </button>}
            </div>
          </div>
        </div>
        {showM1 && <Success showM={showM1} />}
      </div>
    </div>
  )
}

export default Modal