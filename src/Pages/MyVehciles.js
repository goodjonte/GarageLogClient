import React from 'react';
import NavBar from '../Components/NavBar';
import Cookies from 'universal-cookie';
import '../App.css';

export default function MyVehciles() {

    const [vehciles, setVehciles] = React.useState([]);

    const cookies = new Cookies();
    var JWT = cookies.get('JWT_Token');
    console.log(JWT);
    
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
        <div>
            <NavBar />
            <a href="/CreateVehcile">Create Vehcile</a>
            <div className="MyVehciles">
                <h1>My Vehciles</h1>
                {vehciles.map((vehcile) => (
                    <div key={vehcile.id} className='testVehcile'>
                        <h1>{vehcile.name}</h1>
                        <h1>{vehcile.id}</h1>
                        <h1>{vehcile.kilometersOrHours}</h1>
                        <a href={"/MyMaintenance?vehcileId=" + vehcile.id}>View Maintenance</a>
                    </div>
                ))}
            </div>
        </div>
    )
}