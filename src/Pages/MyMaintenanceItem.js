import React from 'react';
import NavBar from '../Components/NavBar';

export default function MyMaintenance() {

    const [maintenanceItems, setMaintenanceItems] = React.useState([]);

    const urlParams = new URLSearchParams(window.location.search);
    const vehcileId = urlParams.get('vehcileId');

    React.useEffect(() => {
        GetMyMaintenanceItems();
    }, []);

    async function GetMyMaintenanceItems() {
        await fetch('https://localhost:7018/api/Maintenance/' + vehcileId, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
            }
        }).then(response => {
            response.json().then(data => {
                setMaintenanceItems(data);
                console.log(data);
            }
            );
            
        });
    }

    return (
        <div>
            <NavBar />
            <a href={"/CreateMaintenanceLog?vehcileId=" + vehcileId}>Create a New Maintenance Log</a>
            <h1>
                My Maintenance
            </h1>
            <div>
                {maintenanceItems.map((maintenanceItem) => (
                    <div className='MaintenanceItem' key={maintenanceItem.id}>
                        <h1>{maintenanceItem.name}</h1>
                        <h1>{maintenanceItem.dueDate}</h1>
                        <h1>{maintenanceItem.maintType}</h1>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}