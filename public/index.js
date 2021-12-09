


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

        //Filter unwanted items
        //FIXME: check if correct
        data = data.filter(item => {
            return item.LocalizedNames //Only if has name
        })

        return parseItemList(data);

    } catch (error) {
        console.log("API error")
    }
}

function parseItemList(list) {
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
    return item_list.filter((item) => {
        try{
            const spanish = item.LocalizedNames["ES-ES"].toLowerCase()
            const english = item.LocalizedNames["EN-US"].toLowerCase()
            return (spanish.includes(search) || english.includes(search))
        } catch(error) {
            return false;
        }
    });
}

document.getElementById("search_box").addEventListener("input", (event) => {
    const search = document.getElementById("search_box").value.toLowerCase();
    renderItems(filterItems(search));
})

function renderItems(items) {
    console.log("Rendering items:", items)
    const item_list_box = document.getElementById("item_list_box");

    item_list_box.innerHTML= "";
    let table = document.createElement('table');
    table.style.width = '100%';
    table.style.border = '1px solid black';
    
    //Table header
    const header = table.insertRow();
    const th_id = header.insertCell();
    th_id.innerHTML= "ID";
    const th_tier = header.insertCell();
    th_tier.innerHTML= "TIER";
    const th_name_en = header.insertCell();
    th_name_en.innerHTML="NAME";
    const th_name_es = header.insertCell();
    th_name_es.innerHTML= "NOMBRE";

    //each item row
    items.forEach(item => {
        try {
            const tr = table.insertRow();
            const td_id = tr.insertCell();
            td_id.innerHTML= item.UniqueName;
            const td_tier = tr.insertCell();
            if (item.tier != undefined ) {
                td_tier.innerHTML= item.tier;
            }
            const td_name_en = tr.insertCell();
            td_name_en.innerHTML= item.LocalizedNames["EN-US"];
            const td_name_es = tr.insertCell();
            td_name_es.innerHTML= item.LocalizedNames["ES-ES"];
        } catch (error) { /*pass*/ }
    })

    item_list_box.appendChild(table);
}


const item_list = await getItemList()
renderItems(item_list)
