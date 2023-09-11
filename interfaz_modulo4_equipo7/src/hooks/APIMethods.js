import API from "/src/hooks/APIController";

export default class APIMethods {
    static async postPassenger(passenger) {
        // let body = {};
        // for (let key in passenger) {
        //     body[key] = passenger[key];
        // }
        // let form = body;
        console.log("JSON in postPassenger: " + passenger);

        const response = await API.POST(`esp32-passengers`, passenger);
        console.log(response);
        return response;
    }
}

