import axios from "axios";

export default class CrudService {

    getCrud() {
        const res = axios('https://mocki.io/v1/5ba170f2-04b5-4ec7-81f2-9a8186fc251c', {
            method: 'GET',
            headers: {
                mode: 'no-cors',
            }
        })

        return res;
    };

}
