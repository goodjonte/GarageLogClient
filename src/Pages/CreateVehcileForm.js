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
            <h1>Create Vehcile Form</h1>
            <form className="CreateVehcileForm" method='post' onSubmit={CreateVehcile}>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label for="vehcileType">VehcileType:</label>
                <select name="vehcileType" id="vehcileType">
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

                <label for="KilometersOrHours">Mileage/Kilometers:</label>
                <input type="number" id="KilometersOrHours" name="KilometersOrHours" />

                <label for="hours">Calculate Mileage in Hours?</label>
                <input type="checkbox" id="hours" name="hours" /><br />

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}