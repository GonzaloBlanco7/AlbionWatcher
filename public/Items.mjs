
export default class Items {
    constructor() {
        var item_list = [];
        console.log(item_list)
    }

    async loadItems() {
        item_list = await getItemList()
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
    const ITEM_LIST_URL = "https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.json";

    try {
        const response = await fetch(ITEM_LIST_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // Unkown Status
        if (response.status !== 200) {
            throw new Error("No ha sido posible actualizar los datos");
        }

        let data = await response.json()

        return parseItemList(data);

    } catch (error) {
        console.log("API error")
    }
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