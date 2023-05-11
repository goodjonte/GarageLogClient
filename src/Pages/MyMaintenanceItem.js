import React from 'react';
import NavBar from '../Components/NavBar';
import Loading from '../Components/Loading';
import * as Operations from '../Operations/Operations';
import Config from '../Config'; 

export default function MyMaintenance() {

    const [myMaintenanceItems, setMyMaintenanceItems] = React.useState(null);
    const [vehcile, setVehcile] = React.useState(null);
    const [loadingBool, setLoadingBool] = React.useState(true);

    const urlParams = new URLSearchParams(window.location.search);
    const vehcileId = urlParams.get('vehcileId');

    React.useEffect(async () => {
        GetMyMaintenanceItems();
        GetAVehcile(vehcileId);
    }, []);

    async function GetMyMaintenanceItems() {
        await fetch(Config.getApiUrl() + 'Maintenance/' + vehcileId, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
            }
        }).then(response => {
            response.json().then(data => {
                if(response.status === 200){
                    setMyMaintenanceItems(data);
                }
            });
        });
    }

    async function GetAVehcile(Id) {
        await fetch(Config.getApiUrl() + 'Vehcile/' + Id, {
            method: 'GET',
            headers: {
                'accept': '*/*',
            }
        }).then(response => {
            response.json().then(data => {
                setVehcile(data);
                setLoadingBool(false);
            });
        });
    }

    return (
        <div>
            <NavBar />

            <Loading loadingBool={loadingBool} />

            <div className={loadingBool ? 'hidden' : 'vehcileMaint container' }>
                {vehcile != null ?

                    <div className='MaintVehcileBox'>
                        <div className='MaintVehcileIcon'>
                            {Operations.GetVehcileIcon(vehcile.vehcileType)}
                        </div>
                        <div>
                            <h3 className='title'> My {vehcile.name} </h3>
                            <p>{vehcile.kilometersOrHours ? Operations.NumberToReadableString(vehcile.kilometersOrHours) : ""}{vehcile.kilometersOrHours ? vehcile.isHours ? "Hours" : "km" : ""}
                            <span className='editButton' onClick={() => Operations.UpdateMilegae(vehcile.id)}>Update</span>
                            </p>
                        </div>
                    </div>
                : ""}

                <div className='vehcileLink'>
                    <button className="btn btn-outline-dark">
                        <a className='newVehcileButtonA text-color' href={"/CreateMaintenanceLog?vehcileId=" + vehcileId}>Create a New Maintenance Log</a>
                    </button>
                </div>
                <div className='row justify-content-center'>
                    {
                        myMaintenanceItems != null ? myMaintenanceItems.map((maintenanceItem) => (
                            <div className='MaintenanceItem col-sm-6' key={maintenanceItem.id}>
                                <div onClick={() => Operations.DeleteLog(maintenanceItem.id)} className="deleteButtonMaint">
                                    {Operations.TrashIcon()}
                                </div>
                                <div className='MaintIcon'>{Operations.GetMaintenanceIcon(maintenanceItem.maintType)}</div>
                                <h1>{maintenanceItem.name}</h1>
                                <h5>{maintenanceItem.dateBool ? "Done At: " + Operations.ReadAbleDate(maintenanceItem.doneAtDate) : maintenanceItem.doneAtKilometers != null ? "Done At: " + Operations.NumberToReadableString(maintenanceItem.doneAtKilometers) + "km" : ""}</h5>
                                <h5>{maintenanceItem.dueDate != null ? "Due At: " + Operations.ReadAbleDate(maintenanceItem.dueDate) : maintenanceItem.dueKilometers != null ? "Due At: " + Operations.NumberToReadableString(maintenanceItem.dueKilometers) + "km" : ""}</h5>
                                
                                {
                                maintenanceItem.notes ?
                                <div>
                                    <h4>Notes:</h4>
                                    <p>{maintenanceItem.notes}</p>
                                </div>
                                : ""
                                };
                            </div>
                            ))
                        : 
                        <h1 id='NoItemsTitle'>
                            No Maintenance Logs
                        </h1>
                    }
                </div>
            </div>
        </div>
    )
}