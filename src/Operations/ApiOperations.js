import Config from "../Config";

//Calls the API to get a users id from email
async function GetUserId(email) {
    const response = await fetch(Config.getApiUrl() + "User/" + email);
    const myJson = await response.json(); 
    return myJson
}

//Calls the API to create a user
async function CreateUser(email) {
    const response = await fetch(Config.getApiUrl() + "User/" + email, {
        method: 'POST',
        body: "", 
        headers: {
          'accept' : 'text/plain'
        }
      });
    const myJson = await response.json(); 
    return myJson
}

//Calls the Api to create a Vehcile
async function GetVehcile(userId) {
    const response = await fetch(Config.getApiUrl() + "Vehcile/" + userId);
    const myJson = await response.json(); 
    return myJson
}

//Calls the Api to delete a Vehcile
async function DeleteVehcile(maintenanceId) {
    const response = await fetch(Config.getApiUrl() + "Vehcile/" + maintenanceId, {
        method: 'DELETE',
        headers: {
          'accept' : '*/*'
        }
      });
    const myJson = await response.json(); 
    return myJson
}

//Calls the Api to Create a Vehcile
async function CreateVehcile(newVehcile) {
    //EXAMPLE OBJECT
    // {
    //     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "userID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "name": "string",
    //     "img": "string",
    //     "isHours": true,
    //     "kilometersOrHours": 0,
    //     "vehcileType": 0
    // }

    const response = await fetch(Config.getApiUrl() + "Vehcile", {
        method: 'POST',
        body: newVehcile, 
        headers: {
          'accept' : 'text/plain',
          'Content-Type' : 'application/json',

        }
      });
    const myJson = await response.json(); 
    return myJson
}


//Calls the Api to create a Maintenance Item
async function GetMaintenanceItem(vehcileId) {
    const response = await fetch(Config.getApiUrl() + "Maintenance/" + vehcileId);
    const myJson = await response.json(); 
    return myJson
}

//Calls the Api to delete a Maintenance item
async function DeleteMaintenanceItem(vehcileId) {
    const response = await fetch(Config.getApiUrl() + "Maintenance/" + vehcileId, {
        method: 'DELETE',
        headers: {
          'accept' : '*/*'
        }
      });
    const myJson = await response.json(); 
    return myJson
}

//Calls the Api to Create a Maintenance Item
async function CreateMaintenanceItem(newMaintenanceItem) {
    //EXAMPLE OBJECT
    // {
    //   "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   "vehcileId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   "name": "string",
    //   "dueDate": "2023-05-01T21:52:42.886Z",
    //   "dueKilometers": 0,
    //   "dueHours": 0,
    //   "notes": "string",
    //   "maintType": 0
    // }

    const response = await fetch(Config.getApiUrl() + "Maintenance", {
        method: 'POST',
        body: newMaintenanceItem, 
        headers: {
          'accept' : 'text/plain',
          'Content-Type' : 'application/json',

        }
      });
    const myJson = await response.json(); 
    return myJson
}