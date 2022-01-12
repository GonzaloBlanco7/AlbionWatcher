
function getItemCurrentData(item_id) {
    //DOC: https://www.albion-online-data.com/

    //if item_id is array -> item_id = item_id.join(",")
    const ITEM_INFO_URL = 'https://www.albion-online-data.com/api/v2/stats/prices/' + item_id + '.json';

    return new Promise((resolve, reject) => {
        try {
            fetch(ITEM_INFO_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    // Unkown Status
                    if (response.status !== 200) {
                        throw new Error("No ha sido posible obtener los datos")
                    }

                    return response.json()
                })
                .then(data => resolve(data));

        } catch (e) {
            reject(e);
        }
    })
}