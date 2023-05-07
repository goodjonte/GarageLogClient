import React from 'react';
import '../App.css';
import NavBar from '../Components/NavBar';

export default function CreateMaintenanceItem() {

    const urlParams = new URLSearchParams(window.location.search);
    const vehcileId = urlParams.get('vehcileId');
    const [customBool, setCustomBool] = React.useState(false)
    const [dateBool, setDateBool] = React.useState(false)

    function CustomBoolSwitch() {
        setCustomBool(!customBool);
    }
    function DateBoolSwitch() {
        setDateBool(!dateBool);
    }

    function CreateMaintItem(event) {
        event.preventDefault();
        console.log(event.target);

        var name;

        if(customBool){
            name = event.target.name.value;
            event.target.maintType.value = 9;
        }else{
            name = event.target.maintType.options[event.target.maintType.value].text
        }

        var maintObj = {
            "id": "3da85f64-5717-4562-b3fc-2c963f66afa6",
            "vehcileId": vehcileId,
            "name": name,
            "dateBool" : dateBool,
            "doneAtDate": dateBool ? event.target.doneAtDate.value + "T00:00:00" : null,
            "dueDate": dateBool ? event.target.dueAtDate.value + "T00:00:00" : null,
            "doneAtKilometers": dateBool ? null : parseInt(event.target.doneAt.value),
            "dueKilometers": dateBool ? null : parseInt(event.target.dueAt.value),
            "notes": event.target.notes.value,
            "maintType": parseInt(event.target.maintType.value)
        }

        console.log(maintObj);

        fetch('https://localhost:7018/api/Maintenance', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(maintObj)
        }).then(response => {
            response.json().then(data => {
                console.log(data);
                window.location.href = "/MyMaintenance?vehcileId=" + vehcileId;
            });
        });
    }


    return (
        <div>
            <NavBar />
            <h1>Create a Maintenance Log</h1>
            <form className="CreateMaintForm" method='post' onSubmit={CreateMaintItem}>
                <label>Maintenance Type:</label>
                <select name="maintType" id="maintType">
                    <option value="0">Air Filter</option>
                    <option value="1">Battery</option>
                    <option value="2">Brake Discs</option>
                    <option value="3">Brake Fluid</option>
                    <option value="4">Brake Pads</option>
                    <option value="5">Coolant</option>
                    <option value="6">Differential Fluid</option>
                    <option value="7">Fuel Filter</option>
                    <option value="8">Oil And Filter</option>
                    <option value="9">Other</option>
                    <option value="10">Power Steering Fluid</option>
                    <option value="11">Serpentine Belt</option>
                    <option value="12">Spark Plugs</option>
                    <option value="13">Suspension</option>
                    <option value="14">Tires</option>
                    <option value="15">Tire Rotation</option>
                    <option value="16">Timing Belt</option>
                    <option value="17">Transmission Filter</option>
                    <option value="18">Transmission Fluid</option>
                    <option value="19">Wheel Alignment</option>
                    <option value="20">Wiper Blades</option>
                </select>

                <label>Create a Custom Maintenance type?</label>
                <input type="checkbox" id="otherMaintType" onClick={CustomBoolSwitch} name="otherMaintType" /><br />

                <div className={customBool ? "" : "hidden"}> 
                    <label>Custom Maintenance Type Name:</label>
                    <input type="text" id="name" name="name" />
                </div>

                <label>Use Date instead of Mileage?</label>
                <input type="checkbox" id="dateChech" onClick={DateBoolSwitch} name="dateChech" /><br />

                <div className={dateBool ? "" : "hidden"}> 
                    <label>Done At Date:</label>
                    <input type="date" id="doneAtDate" name="doneAtDate" />

                    <label>Due At Date:</label>
                    <input type="date" id="dueAtDate" name="dueAtDate" />
                </div>

                <div className={dateBool ? "hidden" : ""} >
                    <label>Done At Mileage:</label>
                    <input type="number" id="doneAt" name="doneAt" />

                    <label>Due At Mileage:</label>
                    <input type="number" id="dueAt" name="dueAt" />
                </div>

                <label>Notes:</label>
                <input type="text" id="notes" name="notes" />

                <input type="submit" value="Submit" />

            </form>
        </div>
    )
}