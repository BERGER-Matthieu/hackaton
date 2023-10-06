import {React, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Map from '../map/map';


const Home = () => {
    const [markers, setMarkers] = useState("");

    const cookies = new Cookies();

    const logOut = () => {
        cookies.remove('userId');
        window.location.reload();
    }

    if (cookies.get('userId') === undefined) {
        return <Navigate to="/login-register"/>
    }

    const confirm = () => {
        const checkBoxes = document.querySelectorAll("input[type=checkbox]:checked");

        const refineDic = {
            'moto': 'refine=regpri%3A%222%20ROUES%22&',
            'auto': 'refine=regpri%3A%22AUTOCAR%22&',
            'autre': 'refine=regpri%3A%22AUTRE%20REGIME%22&',
            'electrique': 'refine=regpri%3A%22ELECTRIQUE%22&',
            'gig-gic': 'refine=regpri%3A%22GIG%2FGIC%22&',
            'gratuit': 'refine=regpri%3A%22GRATUIT%22&',
            'livraison': 'refine=regpri%3A%22LIVRAISON%22&',
            'location': 'refine=regpri%3A%22LOCATION%22&',
            'payant-mixte': 'refine=regpri%3A%22PAYANT%20MIXTE%22&',
            'payant-rotatif': 'refine=regpri%3A%22PAYANT%20ROTATIF%22&'
        }
        
        let url = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100&';

        checkBoxes.forEach((checkBox) => {
            url = url.concat(refineDic[checkBox.id])
        });

        fetch(url)
        .then(response => {
            if(!response.ok){
                throw new Error("nuh huh")
            }
            return response.json()
        })
        .then(data => {
            setMarkers(JSON.stringify(data['results']));
        })
        .catch(err => console.log(err))

    }
    return (
        <div className='page'>
            <div className='header'>
                <button onClick={() => logOut()} className='log-out'>log out</button>
            </div>
            <div className='checkbox-map-container'>
                <div className='checkbox-container'>
                    <div className='search-container'>
                        <ul className='checkbox-list'>
                            <li><label htmlFor="moto"><input className='checkbox' type="checkbox" id="moto" />Moto</label></li>
                            <li><label htmlFor="auto"><input className='checkbox' type="checkbox" id="auto" />Auto</label></li>
                            <li><label htmlFor="autre"><input className='checkbox' type="checkbox" id="autre" />Autre</label></li>
                            <li><label htmlFor="electrique"><input className='checkbox' type="checkbox" id="electrique" />Electrique</label></li>
                            <li><label htmlFor="gig-gic"><input className='checkbox' type="checkbox" id="gig-gic" />Gig/Gic</label></li>
                            <li><label htmlFor="gratuit"><input className='checkbox' type="checkbox" id="gratuit" />Gratuit</label></li>
                            <li><label htmlFor="livraison"><input className='checkbox' type="checkbox" id="livraison" />Livraison</label></li>
                            <li><label htmlFor="location"><input className='checkbox' type="checkbox" id="location" />Location</label></li>
                            <li><label htmlFor="payant-mixte"><input className='checkbox' type="checkbox" id="payant-mixte" />Payant mixte</label></li>
                            <li><label htmlFor="payant-rotatif"><input className='checkbox' type="checkbox" id="payant-rotatif" />Payant rotatif</label></li>
                        </ul>
                        <div className='confirm-box'>
                            <input className='confirm' type="button" value="Confirm" onClick={() => confirm()}/>
                        </div>
                    </div>
                </div>
                <div className='map-container'>
                    <Map className="map" data={markers}/>
                </div>
            </div>
        </div>
    );
}

export default Home;