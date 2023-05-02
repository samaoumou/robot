import {useEffect, useState} from "react";
import { Climat } from "../../Models/historique";
import NoResult from "./NoResult";
import Pagination from "./Pagination";
import HistoryItem from "./HistoryItem";


/* Composant Historique */
export function Historique() {
    /* Stockage des données de l'historique dans une variable d'état */
    const [history, setHistory] = useState<Climat[]>([]);

    /* toute l'historique est stockée dans la variable d'état history, mais pour la pagination, on ne veut afficher que 4 éléments à la fois, donc on crée une variable d'état pour stocker les 4 éléments à afficher */
    const [currentItems, setCurrentItems] = useState<Climat[]>([]);

    /* Variable d'état pour gèrer la page courante */
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(4);
    const [totalItems, setTotalItems] = useState<number>(0);

    /* Fonction de pagination */
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);

        const indexOfLastItem = pageNumber * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(currentItems);
    }
    

    /* Variable d'état pour gèrer le mode recherche */
    const [searchMode, setSearchMode] = useState<boolean>(false);

    /* Variable d'état pour vérifier si la recherche a eu un résultat ou non */
    const [hasResult, setHasResult] = useState<boolean>(true);

    /* Fonction de recherche par date */
    const search = (e: any) => {
        setSearchMode(true);

        if (e.target.value === "") {
            setSearchMode(false);
            paginate(1);
            return;
        }
        const dateSearch = new Date(e.target.value);
        
        const result = history.filter((item) => {
            const date =  item.date;
            
            return date.getFullYear() === dateSearch.getFullYear() && date.getMonth() + 1 === dateSearch.getMonth() + 1 && date.getDate() === dateSearch.getDate();
        });
        setHasResult(result.length > 0); 
        setCurrentItems(result);
    }

    

    useEffect(() => {
        /* Récupération des données de l'historique */
        fetch("http://localhost:3000/climat/moyenne", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data: Climat[]) => {
                    data = data.filter((item) => item._id.year != null)
                    console.log(data);
                    const climat = data.map((item) => {
                        return {
                            date: new Date(item._id.year, item._id.month - 1, item._id.day),
                            temperature: item.temperature,
                            humidityA: item.humidityA,
                            humidityS: item.humidityS,
                            luminosity: item.luminosity,
                            _id: item._id,
                        }
                    });
                    const sortedClimat = climat.sort((a, b) => b.date.getTime() - a.date.getTime());
                    setHistory(sortedClimat);
                    setCurrentItems(sortedClimat.slice(0, 4));
                    setTotalItems(data.length);
                });
            }
        });
        /* Pagination */
        paginate(1);
    }, []);

    return (
        <div className="flex px-5 h-96 py-1 flex-col bg-white drop-shadow-lg flex-1 text-center">
            <h1 className="text-3xl text-emerald-500 font-bold">Historique</h1>
            <div className="flex justify-end">
                <input type="date" onChange={(e) => search(e)} className="border-2 border-gray-500 rounded-md p-2 mt-3" />
            </div>
            <table className="table-auto mt-3">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-2 border-gray-500">
                        <span className="text-emerald-500">Jours</span>
                        <span className="text-gray-500 ml-2 mr-2">\</span>
                        <span className="text-emerald-500">Données</span>
                    </th>
                    <th className="px-4 py-2 border-2 border-gray-500">Température</th>
                    <th className="px-4 py-2 border-2 border-gray-500">Humidité</th>
                    <th className="px-4 py-2 border-2 border-gray-500">Luminosité</th>
                </tr>
                </thead>
                <tbody>
                {hasResult && currentItems.map((item, index) => (
                    <HistoryItem data={item} key={index} />
                    //<p>Ok cool</p>
                ))}
                {!hasResult && 
                    <NoResult />
                }
                </tbody>
            </table>
            {!searchMode && hasResult && <Pagination
                paginate={paginate}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />}
        </div>
    );
}
