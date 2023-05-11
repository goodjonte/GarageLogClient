import React from 'react';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';
import Cookies from 'universal-cookie';
import * as Operations from '../Operations/Operations';
import '../App.css';
import Config from '../Config';



export default function MyVehciles() {
    const [vehciles, setVehciles] = React.useState(null);//holds JSX vehcile objects
    const [loadingBool, setLoadingBool] = React.useState(true);

    const cookies = new Cookies();
    var JWT = cookies.get('JWT_Token');
    
    React.useEffect(() => {
        GetMyVehciles();
    }, []);

    async function GetMyVehciles() {
        await fetch(Config.getApiUrl() + 'Vehcile?JWT=' + JWT, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            response.json().then(data => {
                setVehciles(Operations.MapMyVehciles(data))
                setLoadingBool(false);
            });
        });
    }
    
    return (
        <div>
            <NavBar />

            <Loading loadingBool={loadingBool} />

            <div className={loadingBool ? 'hidden' : 'MyVehciles row justify-content-center' }>
                <h1 className='text-color title' >My Vehciles</h1>
                <div className='vehcileLink'>
                    <button className="btn btn-outline-dark "><a className='newVehcileButtonA text-color' href="/CreateVehcile">Add a New Vehcile</a></button>
                </div>
                {
                    vehciles != null ? vehciles : ""
                }
            </div>
        </div>
    )
}