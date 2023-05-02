import ConnexionForm from "../src/components/connexion/ConnexionForm"
import {Navigate} from "react-router-dom";

const Connexion = ({redirectPath='/dashboard'}: {redirectPath?: string}) => {
    const access_token = localStorage.getItem('token');

    if (access_token) {
        return <Navigate to={redirectPath} replace />;
    }
    return (
        <>
          <ConnexionForm />
        </>
    )
}

export default Connexion