
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

function filterItems(search) {
    const language = getLanguage();
    return item_list.filter((item) => {
        try{
            const name = item.LocalizedNames[language].toLowerCase()
            return (name.includes(search))
        } catch(error) {
            return false
        }
    });
}

document.getElementById("search_form").addEventListener("submit", (event) => {
    event.preventDefault();
    const search = document.getElementById("search_box").value.toLowerCase()
    renderItems(filterItems(search))
})


function renderItems(items) {
    console.log("Rendering items:", items)
    const language = getLanguage()
    const items_table_body = document.getElementById("items_table_body")
    items_table_body.innerHTML="" //Clear

    // Each item row
    items.forEach(item => {
        try {
            const tr = items_table_body.insertRow();
            const td_action = tr.insertCell();
            td_action.innerHTML = `
                <button 
                    class="btn btn-info item_action" 
                    onclick="handleItemAction('${item.UniqueName}')" 
                >
                    View
                </button>`
            const td_id = tr.insertCell()
            td_id.innerHTML= item.UniqueName
            const td_tier = tr.insertCell()
            if (item.tier != undefined ) {
                td_tier.innerHTML= item.tier
            }
            const td_name = tr.insertCell();
            td_name.innerHTML= item.LocalizedNames[language]
        } catch (error) { 
            console.error("could not render item:", item)
        }
    })
}


function getLanguage() {
    const language = document.querySelector('input[name="language"]:checked').value
    return language
}

const item_list = new ItemList()
renderItems(item_list)
