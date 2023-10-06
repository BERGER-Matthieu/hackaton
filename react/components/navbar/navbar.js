import React from 'react';
import { useState } from 'react';

const Navbar = () => {
    

    
    return (
        <div>
            <ul>
                <li><input type="checkbox" id="moto" /><label htmlFor="moto"></label>Moto</li>
                <li><input type="checkbox" id="auto" /><label htmlFor="auto"></label>Auto</li>
                <li><input type="checkbox" id="autre" /><label htmlFor="autre"></label>Autre</li>
                <li><input type="checkbox" id="electrique" /><label htmlFor="electrique">Electrique</label></li>
                <li><input type="checkbox" id="gig-gic" /><label htmlFor="gig-gic">Gig/Gic</label></li>
                <li><input type="checkbox" id="gratuit" /><label htmlFor="gratuit">Gratuit</label></li>
                <li><input type="checkbox" id="livraison" /><label htmlFor="livraison">Livraison</label></li>
                <li><input type="checkbox" id="location" /><label htmlFor="location"></label>Location</li>
                <li><input type="checkbox" id="payant-mixte" /><label htmlFor="payant-mixte">Payant mixte</label></li>
                <li><input type="checkbox" id="payant-rotatif" /><label htmlFor="payant-rotatif">Payant rotatif</label></li>
            </ul>
            <input type="button" value="Confirm" onClick={() => Confirm()}/>
        </div>
    );
}

export default Navbar;
