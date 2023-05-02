import "./Modification.css";
import { useForm } from "react-hook-form";
import {useRef, useState} from "react";

const Modification = () => {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
      setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data: any) => {
    fetch('http://localhost:3000/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(r => r.json())
        .then(d => {
            fetch(`http://localhost:3000/user/${d.email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    password: data.actuelPassword,
                    newPassword: data.nouveauPassword,
                })
            }).then(r => r.json())
                .then(dt => {
                    setValue('actuelPassword', '');
                    setValue('nouveauPassword', '');
                    setValue('confirmationPassword', '');
                    if(dt.status === 200) {
                        setMessage(dt.message);
                        setShow(true);
                        setTimeout(() => {
                            setShow(false);
                        }, 3000)
                    } else {
                        setMessage(dt.message);
                        setShowError(true);
                        setTimeout(() => {
                            setShowError(false);
                        }, 2000)
                    }
                })
        })
  }
  //console.log(errors);
  const password = useRef({})
  password.current = watch("nouveauPassword", "")

  return (
      <>
          <div className="border-primaryBorder drop-shadow-lg m-auto w-3/5 h-1/2 rounded-lg border bg-white px-16">
              <h1 className="text-emerald-500 mt-4 mb-4 text-center text-2xl font-bold ">
                  Modfier le mot de passe
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div className="flex flex-col">
                      <label htmlFor="password" className="text-lg">Actuel mot de passe</label>
                      <input
                          {...register("actuelPassword", {required: true, minLength: 5, maxLength: 20})}
                          type="password"
                          className={`text-primary mb-4 w-full border-2 border-gray-700 rounded-md p-2 text-sm outline-none transition duration-150 ease-in-out`}
                          id="actuelPassword"/>
                      {errors.actuelPassword?.type === "required" &&
                          <span className='text-red-600 text-sm -mt-4'>Ce champ est Obligatoire</span>}
                      {errors.actuelPassword?.type === "minLength" &&
                          <span className='text-red-600 text-sm -mt-4'>Miminum 5 caractères</span>}
                      {errors.actuelPassword?.type === "maxLength" &&
                          <span className='text-red-600 text-sm -mt-4'>Maximum 20 caractères</span>}
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="password" className="text-lg">Nouveau mot de passe</label>
                      <input
                          {...register("nouveauPassword", {
                              required: {value: true, message: "Champ Obligatoire"}, minLength: 5, maxLength: 20
                          })}
                          type="password"
                          className={`text-primary mb-4 w-full border-2 border-gray-700 rounded-md p-2 text-sm outline-none transition duration-150 ease-in-out`}
                          id="newPassword"/>
                      {errors.nouveauPassword?.type === "required" &&
                          <span className='text-red-600 text-sm -mt-4'>Ce champ est Obligatoire</span>}
                      {errors.nouveauPassword?.type === "minLength" &&
                          <span className='text-red-600 text-sm -mt-4'>Miminum 5 caractères</span>}
                      {errors.nouveauPassword?.type === "maxLength" &&
                          <span className='text-red-600 text-sm -mt-4'>Maximum 20 caractères</span>}
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="password" className="text-lg">Confirmation mot de passe</label>
                      <input
                          {...register("confirmationPassword", {
                              required: {value: true, message: "Champ Obligatoire"},
                              validate: value => password.current === value || "Les deux mots de passe ne correspondent pas"
                          })}
                          type="password"
                          className={`text-primary mb-4 w-full rounded-md border-2 border-gray-700 p-2 text-sm outline-none transition duration-150 ease-in-out`}
                          id="confirmPassword"/>
                      {errors.confirmationPassword &&
                          <span
                              className='text-red-600 text-sm -mt-4'>{errors.confirmationPassword.message as string}</span>}
                  </div>
                  <div className="mt-4 mb-5 flex items-center justify-end">
                      <button
                          type="submit"
                          className={`bg-emerald-100 text-dark hover:bg-emerald-600 hover:text-white rounded border py-2 px-4 -mt-2 m-2 text-md focus:outline-none`}>
                          Modifier
                      </button>
                  </div>
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
                              <p>{message}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className={`relative ${!showError ? 'hidden' : ''} z-10`} aria-labelledby="modal-title" role="dialog"
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
                                  <linearGradient id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z" opacity=".05"></path><path d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z" opacity=".07"></path><path fill="#fff" d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"></path><path fill="#fff" d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"></path>
                              </svg>
                              <p>{message}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};

export default Modification;