import React from 'react';
import NavBar from '../Components/NavBar';
import Cookies from 'universal-cookie';

export default function CreateVehcileForm() {
    
    const cookies = new Cookies();
    var JWT = cookies.get('JWT_Token');


    function CreateVehcile(event) {
        event.preventDefault();
        var vehcileObj = {
            "jwt" : JWT,
            "name" : event.target.name.value,
            "img" : "",
            "isHours": event.target.hours.checked,
            "KilometersOrHours" : isNaN(parseInt(event.target.KilometersOrHours.value))  ? 0 : parseInt(event.target.KilometersOrHours.value),
            "vehcileType" : parseInt(event.target.vehcileType.value),
        }
        fetch('https://localhost:7018/api/Vehcile', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehcileObj)
        }).then(response => {
            window.location.href = "/";
        });
    }

    return (
        <div>
            <NavBar />
            <h1 className='title'>Create Vehcile Form</h1>
            <form className="CreateVehcileForm" method='post' onSubmit={CreateVehcile}>

                <div className='input-group input1'>
                    <span className='input-group-text'>Vehcile Name/Model:</span>
                    <input className='form-control' type="text" id="name" name="name" />
                </div>
                
                <div className='input-group input1'>
                    <span className='input-group-text'>VehcileType:</span>
                    <select className='form-select' name="vehcileType" id="vehcileType">
                        <option value="0">Car</option>
                        <option value="1">Motorbike</option>
                        <option value="2">Truck</option>
                        <option value="3">Tractor</option>
                        <option value="4">Bus</option>
                        <option value="5">Boat</option>
                        <option value="6">Plane</option>
                        <option value="7">Helicopter</option>
                        <option value="8">Other</option>
                    </select>
                </div>

                <div className='input-group input1'>
                    <span className='input-group-text'>Mileage/Kilometers:</span>
                    <input className='form-control' type="number" id="KilometersOrHours" name="KilometersOrHours" />
                </div>

                <label for="hours">Calculate Mileage in Hours?</label>
                <input className='form-check-input' type="checkbox" id="hours" name="hours" /><br />

                <button type='submit' className='btn btn-outline-dark' >Submit</button>

            </form>
        </div>
    )
}