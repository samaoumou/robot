import { useQuery } from '@tanstack/react-query';
import './Parametre.css'
import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Plante } from '../../Models/plante';

function Parametre() {
    /* Déclaration des variables d'état */
    let [heure, setHeure] = useState<string>("");
    let [nombre, setNombre]= useState<string>("");
    let [idPlante, setIdPlante] = useState<string>("");
    let [show, setShow] = useState<boolean>(false);
    let [arrosageError, setArrosageError] = useState<boolean>(false);

    /* Récupération des plantes */
    const { isLoading, error, data:plantes } = useQuery<Plante[], Error>({
        queryKey: ['plantes'],
        queryFn: () =>
          fetch('http://localhost:3000/plantes').then(
            (res) => res.json(),
          ),
    })

    //if (isLoading) return 'Loading...'
   // if (error) return 'An error has occurred: ' + error.message

    /* Récupération des paramètres de la plante sélectionnée */
    const setParametre = (nomPlante: string) => {
        const plante = plantes?.find((plante) => plante.nomPlante === nomPlante);
        console.log(plantes, nomPlante, plante);
        
        if (plante) {
            setHeure(plante.heureArrosage);
            setNombre(plante.nombreArrosage);
            setIdPlante(plante._id);
        }
    }

    /* Formulaire de paramétrage */
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
      } = useForm({ mode: "all" });

      /* Reset des valeurs par défaut */
      useEffect(() => {
        let defaultValues:{nombre: string, heure: string} = { nombre: '', heure: '' };
        defaultValues.nombre = nombre;
        defaultValues.heure = heure;
        reset({ ...defaultValues });
      }, [heure, nombre]);

      /* Enregistrement des paramètres */
      const onSubmit = (data: any) => {
        const nombreArrosage = parseInt(data.nombre?.split(" ")[0]);
        const heureArrosage = data.heure?.split("/").length;

        if (!isValid) return;
        if (Number.isNaN(nombreArrosage) || heureArrosage === undefined) return;
        
        if (nombreArrosage && heureArrosage && (nombreArrosage !== heureArrosage)) {
            setArrosageError(true);
            setTimeout(() => {
                setArrosageError(false);
            }, 4000);
            return;
        }
        
        fetch('http://localhost:3000/plantes/' + idPlante, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({"nombreArrosage": data.nombre, "heureArrosage": data.heure})
        })
        .then(res => res.json())
        .then(data => {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000);
        })
      };

    return(
        <>
            <div className='flex flex-col bg-white h-96 shadow-lg border border-primaryBorder justify-center py-8 mx-32 items-center rounded-lg'>
                <h1 className='w-full text-center mb-5 text-emerald-600 text-2xl font-medium'> Paméterer l'arrosage</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center place-items-center space-y-6'>
                    <div className='w-full'>
                        {arrosageError && <p className='text-red-700 font-bold text-md p-4 bg-red-200 m-2'>
                            Le nombre d'arrosage doit être égal au nombre d'heure d'arrosage
                        </p>}
                        <div className='flex flex-row w-full justify-center'>
                            <label className='w-2/6 mt-2 text-xl'>Type de plante</label>
                            <select className='w-1/2 h-12 ml-8 bg-white border border-gray-200 rounded'
                            {...register("plante", {required: true,})} 
                            name='plante'
                            onChange={(event) => setParametre(event.target.value)}>
                                <option value="">Choisissez une plante</option>
                                <option value="Tomate">Tomate</option>
                                <option value="Aloe vera">Aloe vera</option>
                                <option value="Nana">Nana</option>
                            </select>
                        </div>
                        {errors.plante?.type === "required" && 
                            <span className='text-red-600 ml-80 text-sm'>Ce champ est Obligatoire</span>
                        }
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row w-full justify-center'>
                            <label htmlFor='nombre' className='w-2/6 mt-2 text-xl'>Nombre d'arrosage</label>
                            <input {...register("nombre", {required: true, pattern: /^[0-9]+( fois)$/})} 
                            type="text" name='nombre' className='w-1/2 h-12 ml-8 border border-gray-200 rounded px-2'
                            defaultValue={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder = 'ex. 2 fois'/>
                        </div>
                        {errors.nombre?.type === "required" && 
                            <span className='text-red-600 ml-80 text-sm'>Ce champ est Obligatoire</span>
                        }
                        {errors.nombre?.type === "pattern" && 
                            <span className='text-red-600 ml-80 text-sm'>Format incorrect</span>
                        }
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-row w-full justify-center'>
                            <label htmlFor='heure' className='w-2/6 mt-2 text-xl'>Heures d'arrosage</label>
                            <input {...register("heure", {  required: true, pattern: /([A-Za-z0-9]+(\/[A-Za-z0-9]+)+)/i})} 
                            type="text" name='heure' className='w-1/2 px-2 h-12 ml-8 border border-gray-200 rounded'
                            defaultValue={heure}
                            onChange={(e) => setHeure(e.target.value)}
                            placeholder = 'ex. 10h/15h'/>
                        </div>
                        {errors.heure?.type === "required" && 
                        <span className='text-red-600 ml-80 text-sm'>Ce champ est Obligatoire</span>
                        }
                        {errors.heure?.type === "pattern" && 
                            <span className='text-red-600 ml-80 text-sm'>Format incorrect</span>
                        }
                    </div>
                    <button onClick={onSubmit} type='submit' className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded ml-auto mr-11">
                        Sauvegarder
                    </button>
                </form>
            </div>
            <div className={`relative ${!show ? 'hidden' : ''} z-10`} aria-labelledby="modal-title" role="dialog"
               aria-modal="true">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                      <div
                          className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-8 flex justify-center items-center flex-col">
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                   width="100" height="100"
                                   viewBox="0 0 48 48">
                                  <linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
                              </svg>
                              <p>Paramètres enregistré avec succés</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
    )

}

export default Parametre;