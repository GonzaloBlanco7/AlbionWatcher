
export default class Items {
    constructor() {
        this.item_list = [];
        console.log(this.item_list)
    }

    async loadItems() {
        return new Promise((resolve, reject) => {
            try {
                const ITEM_LIST_URL = "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json";

                fetch(ITEM_LIST_URL, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        // Unkown Status
                        if (response.status !== 200) {
                            throw new Error("No ha sido posible actualizar los datos");
                        }

                        return response.json()
                    })
                    .then(data => parseItemList(data))
                    .then(item_list => resolve(item_list))
               
            } catch (e) {
                reject(e);
            }
        })
        
    }

    getFilteredList(search) {
        const language = getLanguage();
        return item_list.filter((item) => {
            try {
                const name = item.LocalizedNames[language].toLowerCase()
                return (name.includes(search))
            } catch (error) {
                return false
            }
        });
    }
}


async function getItemList() {
   

    
}

function parseItemList(list) {
    //Filter unwanted items
    //FIXME: check if correct
    list = list.filter(item => {
        return item.LocalizedNames //Only if has name
    })

    return list.map((item) => {
        let tier = item.UniqueName.substr(0, 2);
        if (tier[0] === 'T') {
            let tier_number = parseInt(tier[1]);
            if (tier_number != NaN) {
                item.tier = tier_number;
            }
        }

        return item;
    })
}