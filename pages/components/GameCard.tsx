import Link from "next/link";
import { useState, useEffect } from "react";
import { Game } from '../../types';
import ClipLoader from "react-spinners/ClipLoader";
import { getAuth} from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where} from "firebase/firestore"

export default function GameCard(data: any) {
    const [gameData, setGameData] = useState<Game>();
    const [inCollectionState, setInCollectionState] = useState(false);
    const [updateButtonState, setUpdateButtonState] = useState(0);
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    const db = getFirestore();
    useEffect(() => {
        if(data.data.id){
            
            const fetchGameData = async () => {
                const results = await fetch(`https://api.rawg.io/api/games/${data.data.id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
                const response = await results.json();
                return setGameData(response);
            }
            fetchGameData();
        }
      }, [data.data.id])

    useEffect(()=> {
        const checkCollectionState = async () => {
            if(gameData && auth.currentUser){
                const citiesRef = collection(db, `Saved games/${auth.currentUser.uid}/games`);
                const q = query(citiesRef, where("game_id", "==", gameData.id));
                const docsSnap = await getDocs(q);
                var arrLength: any[] = [];
                docsSnap.forEach((doc) => {
                    arrLength.push(doc.data());
                });
                if( arrLength.length === 0){
                     return setInCollectionState(true);
                }
                if( arrLength.length > 0 ){
                     return setInCollectionState(false);
                }
            }
        }
        checkCollectionState()
    },[updateButtonState, inCollectionState, auth.currentUser, gameData, db])
    

    const writeGameToColl = async () => {
        setLoading(true);
      if(gameData && auth.currentUser){
        const docsRef = collection(db, `Saved games/${auth.currentUser.uid}/games`);
        const q = query(docsRef, where("game_id", "==", gameData.id));
        const docsSnap = await getDocs(q);

        var new_data: any[] = []
        docsSnap.forEach((doc) => {
           new_data.push(doc.data());
        });
        
        if( docsSnap.docs.length === 0){
            await addDoc(collection(db, `Saved games/${auth.currentUser.uid}/games`), {
                UID: auth.currentUser?.uid,
                name: gameData.name,
                photoURL: gameData.background_image,
                game_id: gameData.id
            });
            setUpdateButtonState(updateButtonState +1);
            setLoading(false);
            return setInCollectionState(true);
            }
        if( docsSnap.docs.length > 0 ){
            setUpdateButtonState(updateButtonState +1);
            setLoading(false);
            return setInCollectionState(false);
            }
        }
    }
    const removeGameFromColl = async (id: any ) => {
        setLoading(true);

        if(gameData && auth.currentUser){
            const d = query(collection(db, `Saved games/${auth.currentUser.uid}/games`), where('game_id', '==', id));
            const docSnap = await getDocs(d);
            docSnap.forEach((doc) => {
                deleteDoc(doc.ref);
            });
            setUpdateButtonState(updateButtonState +1);
            setLoading(false);
            return setInCollectionState(false);
        }
    }
    return ( 
      <div className="card bg-transparent border-0 gameCard mb-0 pb-4 pt-4 m-auto mt-0 col-6 col-md-5 col-lg-4 col-xl-3">
        <Link href={`/details?slug=${gameData?.slug}`}>
            <a href="" className="text-decoration-none">
                <figure className={`${gameData ? "" : "placeholder-wave"} px-1 border-box position-relative`}>
                    <img src={gameData?.background_image ? gameData?.background_image : "/placeholder.png"} width="100%"
                    height="100px" alt="" className="rounded-3" />
                    <div className="circleShadow position-absolute"></div>
                </figure>
                <div className="bg-light p-2 pb-3 rounded-3 pt-5">
                    {gameData ? 
                    <h5 className="text-white"><small>{gameData.name}</small></h5>
                    : 
                    <div className="pt-4 pb-4 m-auto d-flex justify-content-center align-items-center">
                        <ClipLoader color="#2127c8"/>
                    </div>
                    }
                    <p className="text-white mb-0 d-flex justify-content-between"><small>{gameData?.released}</small><small>{gameData?.metacritic}/100</small></p>
                    <div className="hr-divider rounded" />
                </div>
            </a>
        </Link>
        <div className={`${auth.currentUser ? "" : "d-none"}`}>
            { inCollectionState ?
                <button className={` rounded border-0 mt-2 full-width pt-1 pb-1 bg-success ${inCollectionState ? "" : "d-none"} ${loading ? "disabled" : ""}`} onClick={(e) =>{writeGameToColl()}} >Add </button>
                :
                <button className={` rounded border-0 mt-2 full-width pt-1 pb-1 bg-danger ${inCollectionState ? "d-none" : ""} ${loading ? "disabled" : ""}`} onClick={(e) =>{removeGameFromColl(gameData?.id)}}>Remove</button>
            }
        </div>
      </div>
    );
}