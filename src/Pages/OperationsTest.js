import * as API from '../Operations/ApiOperations.js';
import React from 'react';

export default function OperationsTest() {

    const [userId, setUserId] = React.useState('');
    const [vehcileId, setVehcileId] = React.useState('');
    const [createError, setCreateError] = React.useState('');
    const [VehcileDeleteError, setVehcileDeleteError] = React.useState('');
    const [VehcileCreateError, setVehcileCreateError] = React.useState('');
    const [maintGet, setMaintGet] = React.useState('');
    const [deleteMaint, setDeleteMaint] = React.useState('');
    const [MaintCreateError, setMaintCreateError] = React.useState('');

    function GetUserId(e) {
        e.preventDefault();
        API.GetUserId(e.target[0].value).then((result) => {
            setUserId(result);
        }); 
    };

    function CreateUser(e) {
        e.preventDefault();
        API.CreateUser(e.target[0].value).then((result) => {
            setCreateError(result);
        }); 
    };

    function GetVehcileIds(e) {
        e.preventDefault();
        API.GetVehcilesByUser(e.target[0].value).then((result) => {
            setVehcileId(result);
        });
    }

    function DeleteVehcile(e) {
        e.preventDefault();
        API.DeleteVehcile(e.target[0].value).then((result) => {
            setVehcileDeleteError(result);
        });
    }

    function CreateVehicle(e) {
        e.preventDefault();
        var myObj = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "userID": e.target[0].value,
            "name": e.target[1].value,
            "img": e.target[2].value,
            "isHours": e.target[3].checked,
            "kilometersOrHours": parseInt(e.target[4].value),
            "vehcileType": parseInt(e.target[5].value)
        };
        API.CreateVehcile(myObj).then((result) => {
            setVehcileCreateError(result);
        });
    }

    function GetMaintenanceItems(e){
        e.preventDefault();
        API.GetMaintenanceItem(e.target[0].value).then((result) => {
            setMaintGet(result);
        }); 
    }

    function DeleteMaintenanceItem(e){
        e.preventDefault();
        API.DeleteMaintenanceItem(e.target[0].value).then((result) => {
            setDeleteMaint(result);
        }); 
    }

    function Createmaint(e) {
        e.preventDefault();
        var myObj = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "vehcileId": e.target[0].value,
            "name": e.target[1].value,
            "dueDate": e.target[2].value !== "" ? e.target[2].value + "T00:00:00.000Z" : null,
            "dueKilometers": isNaN(e.target[3].value) ? null : parseInt(e.target[3].value) ,
            "dueHours": isNaN(e.target[4].value) ? null : parseInt(e.target[4].value),
            "notes": e.target[5].value,
            "maintType" : parseInt(e.target[6].value),
        };
        API.CreateMaintenanceItem(myObj).then((result) => {
            setMaintCreateError(result);
        });
    }

    return (
        <div className='OperationsTest'>
            <div className='user'>
                <h1>Get User Id</h1>
                <form method="post" onSubmit={GetUserId}>
                    <input type='text' className='email' placeholder='Email' />
                    <button type='submit' >Submit</button>
                </form>
                <h2>User Id: {userId}</h2>

                <h1>Create User</h1>
                <form method="post" onSubmit={CreateUser}>
                    <input type='text' className='email' placeholder='Email' />
                    <button type='submit' >Submit</button>
                    <h2>{createError}</h2>
                </form>

            </div>

            <div className='vehcile'>
                <h1>Get Vehcile</h1>

                <form method="post" onSubmit={GetVehcileIds}>
                    <input type='text' placeholder='UserId' />
                    <button type='submit' >Submit</button>
                    <h2>Vehcile Id: {vehcileId}</h2>
                </form>
                
                <h1>Delete Vehcile By Id</h1>
                <form method="post" onSubmit={DeleteVehcile}>
                    <input type='text' placeholder='VehcileId' />
                    <button type='submit' >Submit</button>
                </form>
                <h2>Delete: {VehcileDeleteError}</h2>

                <h1>Create Vehcile </h1>
                <form method="post" onSubmit={CreateVehicle}>
                    <input type='text' placeholder='UserId' />
                    <input type='text' placeholder='Name' />
                    <input type='text' placeholder='Img' />
                    <input type='checkbox' placeholder='isHours' />
                    <input type='number' placeholder='kilometersOrHours' />
                    <input type='range' min="0" max="8" />
                    <button type='submit' >Submit</button>
                </form>
                <h2>Create: {VehcileCreateError}</h2>
            </div>

            <div className='maintenance'>
            <h1>Get Maintenance Items</h1>

            <form method="post" onSubmit={GetMaintenanceItems}>
                <input type='text' placeholder='VehcileId' />
                <button type='submit' >Submit</button>
                <h2>Maintenance Items: {maintGet}</h2>
            </form>

            <h1>Delete Maint Item By Id</h1>
            <form method="post" onSubmit={DeleteMaintenanceItem}>
                <input type='text' placeholder='VehcileId' />
                <button type='submit' >Submit</button>
            </form>
            <h2>Delete Maint: {deleteMaint}</h2>
            
            <h1>Create Maint </h1>
            <form method="post" onSubmit={Createmaint}>
                <input type='text' placeholder='VehcileId' />
                <input type='text' placeholder='Name' />
                <input type='date' placeholder='DueDate' />
                <input type='number' placeholder='DueKilometers' />
                <input type='number' placeholder='DueHours' />
                <input type='text' placeholder="Notes" />
                <input type='range' min="0" max="20" placeholder='MaintType' />
                <button type='submit' >Submit</button>
            </form>
            <h2>Create: {MaintCreateError}</h2>
            </div>
        </div>
    );
};