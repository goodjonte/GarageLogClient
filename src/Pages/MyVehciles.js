import React from 'react';
import NavBar from '../Components/NavBar';
import Cookies from 'universal-cookie';
import '../App.css';
import * as Operations from '../Operations/Operations';

export default function MyVehciles() {

    const [vehciles, setVehciles] = React.useState([]);

    const cookies = new Cookies();
    var JWT = cookies.get('JWT_Token');
    
    React.useEffect(() => {
        GetMyVehciles();
    }, []);

    async function GetMyVehciles() {
        await fetch('https://localhost:7018/api/Vehcile?JWT=' + JWT, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                setVehciles(data);
            });
            
        });
    }

    return (
        <div className="">
            <NavBar />
            <div className="MyVehciles row justify-content-center">
                <h1 className='text-color title'>My Vehciles</h1>
                <div className='vehcileLink'>
                    <button className="btn btn-outline-dark "><a className='newVehcileButtonA text-color' href="/CreateVehcile">Add a New Vehcile</a></button>
                </div>
                {vehciles.map((vehcile) => (
                    <div key={vehcile.id} className='Vehcile col-md-6'>
                        <div className='vehcileIcon'>
                            {Operations.GetVehcileIcon(vehcile.vehcileType)}
                        </div>
                        <h1 className='text-color'>{vehcile.name}</h1>  
                        <p className='text-color text-center'>{vehcile.kilometersOrHours ? Operations.NumberToReadableString(vehcile.kilometersOrHours) : ""} {vehcile.kilometersOrHours ? vehcile.isHours ? "Hours" : "Kilometers" : ""}</p>
                        <div className='flex'>
                            <button className='btn btn-outline-dark'>
                                <a className="viewMaintButtonA text-color font-decoration-none" href={"/MyMaintenance?vehcileId=" + vehcile.id}>View Maintenance</a>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}