import Config from "../Config";

    //reg expression for validating guids
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    //Calls the API to get a users id from email
    async function GetUserId(email) {
        var response;
            try{
                response = await fetch(Config.getApiUrl() + "User/" + email);
                if(response.status === 500){
                    return "Not Found";
                }
                let body = await response.json();
                return body[0].id;
            }catch{
                return "Error";
            }
    };

    //Calls the API to create a user
    async function CreateUser(email) {
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "User/" + email, {
                method: 'POST',
                headers: {
                'accept' : 'text/plain'
                }
            });
            if(response.status === 409){
                return "User Exists";
            }
            return "User Created";
        }catch{
            return "Error";
        }
    }

    //Calls the Api to create a Vehcile
    async function GetVehcilesByUser(userId) {
        if(regexExp.test(userId) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Vehcile/" + userId);
            if(response.status === 404){
                return "Not Found";
            }
            let body = await response.json();
            let data = [];
            body.forEach(vehcile => {
                data.push(vehcile.id);
            });
            return data;
        }catch{
            return "Error";
        }
    }

    //Calls the Api to delete a Vehcile
    async function DeleteVehcile(maintenanceId) {
        if(regexExp.test(maintenanceId) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Vehcile/" + maintenanceId, {
                method: 'DELETE',
                headers: {
                'accept' : '*/*'
                }
            });
            if(response.status === 400){
                return "Not Found";
            }
            return "Deleted";

        }catch{
            return "Error";
        }
    }

    //Calls the Api to Create a Vehcile
    async function CreateVehcile(newVehcileObject) {
        //EXAMPLE OBJECT
        // {
        //     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     "userID": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     "name": "string",
        //     "img": "string",
        //     "isHours": true,
        //     "kilometersOrHours": 0,
        //     "vehcileType": 0
        // }newVehcileObject.userID
        if(regexExp.test(newVehcileObject.userID) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Vehcile", {
                method: 'POST',
                body: JSON.stringify(newVehcileObject), 
                headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json',
                }
            });
            if(response.status === 400){
                console.log(response);
                return "Err";
            }
            return "Created Vehcile"
        }catch{
            return "Error";
        }
    };


    //Calls the Api to create a Maintenance Item
    async function GetMaintenanceItem(vehcileId) {
        if(regexExp.test(vehcileId) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Maintenance/" + vehcileId);
            const myJson = await response.json(); 
            if(response.status === 404){
                return "Not Found";
            }
            console.log(myJson);
            return "Logged in Console";
        }catch{
            return "Error";
        }
    }

    //Calls the Api to delete a Maintenance item
    async function DeleteMaintenanceItem(vehcileId) {
        if(regexExp.test(vehcileId) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Maintenance/" + vehcileId, {
                method: 'DELETE',
                headers: {
                'accept' : '*/*'
                }
            });
            if(response.status === 404 || response.status === 400){
                return "Not Found";
            }
            return "Deleted";
        }catch{
            return "Error";
        }
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
        if(regexExp.test(newMaintenanceItem.vehcileId) === false){
            return "Id Not Valid";
        }
        var response;
        try{
            response = await fetch(Config.getApiUrl() + "Maintenance", {
                method: 'POST',
                body: JSON.stringify(newMaintenanceItem), 
                headers: {
                'accept' : 'application/json',
                'Content-Type' : 'application/json',
                }
            });
            if(response.status === 400){
                console.log(response);
                return "Err";
            }
            return "Created Maintenance Item";
        }catch{
            return "Error";
        }
            
    }

export {GetUserId, CreateUser, GetVehcilesByUser, DeleteVehcile, CreateVehcile, GetMaintenanceItem, DeleteMaintenanceItem, CreateMaintenanceItem};