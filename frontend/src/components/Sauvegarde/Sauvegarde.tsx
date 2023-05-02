import { useEffect, useState } from 'react'
import Modal from './Modal'
import { Plante } from '../../Models/plante';
import imgTomate from '../../assets/tomate.png'
import imgAloevera from '../../assets/aloevera.png'
import imgNana from '../../assets/nana.png'

const Sauvegarde = () => {
    const [show, setShow] = useState<boolean>(false)
    const [modalData, setModalData] = useState({} as Plante)

    const [data, setData] = useState<Plante[]>([]);
    const [refreshData, setRefreshData] = useState<boolean>(false)

    useEffect(() => {
        fetch('http://localhost:3000/plantes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            setData(data);
            setRefreshData(false);
            console.log(data);
        })
    }, [refreshData])

    return (
        <div className="justify-center drop-shadow-lg m-auto w-full h-96 rounded-lg border bg-white">
            <h1 className="text-emerald-500 mt-4 mb-4 text-center text-2xl font-bold ">Paramètre arrosage enregistré</h1>
            <div className='flex flex-row gap-4 py-4 px-5'>
                {
                    data.map((d) =>

                        <button value={d.nomPlante} onClick={(e) => {
                            if (d.nomPlante == e.currentTarget.value) {
                                setModalData(d)
                            }
                            setShow(true)
                        }}>
                            <div className='flex flex-col justify-center items-center bg-white px-8 py-2 shadow-md'>
                                {d.etat === true &&
                                    <div className='w-25'>
                                        <div className='absolute ml-10'>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                width="40" height="40"
                                                viewBox="0 0 48 48">
                                                <path fill="#4CAF50" d="M37,5H11l-5,7v8v20c0,1.656,1.343,3,3,3h30c1.656,0,3-1.344,3-3V20v-8L37,5z"></path><path fill="#2E7D32" d="M12.029,7l-3.571,5H18c0,3.313,2.687,6,6,6s6-2.687,6-6h9.542l-3.571-5H12.029z"></path><path fill="#CCFF90" d="M30.826 21.754L22.934 29.656 19.17 25.898 17 28.076 22.938 34 33 23.926z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                }
                                {d.nomPlante === 'Aloe vera' && <img src={imgAloevera} className='w-24 h-24 mt-2' alt="" />}
                                {d.nomPlante === 'Tomate' && <img src={imgTomate} className='w-24 h-24 mt-2' alt="" />}
                                {d.nomPlante === 'Nana' && <img src={imgNana} className='w-24 h-24 mt-2' alt="" />}
                                <span className='text-center mt-6 text-xl font-medium'>{d.nomPlante}</span>
                            </div>
                        </button>
                    )
                }
            </div>
                <Modal 
                    show={show}
                    setShow={setShow}
                    data={modalData}
                    plantes={data}
                    setRefreshData={setRefreshData}
                />
                
        </div>
    )
}

export default Sauvegarde