var items = new Items();
items.loadItems()
    .then(result => {
        if (result) {
            renderItems(items.item_list)
        }
    });


function getLanguage() {
    return document.querySelector('input[name="language"]:checked').value;
}

function renderItems(items) {
    //console.log("Rendering items:", items)
    const language = getLanguage()
    const items_table_body = document.getElementById("items_table_body")
    items_table_body.innerHTML = "" //Clear

    // Each item row
    items.forEach(item => {
        try {
            const tr = items_table_body.insertRow()

            const td_action = tr.insertCell()
            const img = `<img src="${getItemImage(item.UniqueName)}" width="70vw" class="m-0 p-0" alt="View">`
            td_action.innerHTML = `
                <button 
                    class="btn btn-info item_action p-0" 
                    onclick="handleItemAction('${item.UniqueName}')" 
                >
                    ${img}
                </button>`

            //const td_id = tr.insertCell()
            //td_id.innerHTML = item.UniqueName

            const td_name = tr.insertCell();
            td_name.innerHTML = item.LocalizedNames[language]
            
            const td_tier = tr.insertCell()
            if (item.tier !== undefined) {
                td_tier.innerHTML = item.tier
            }

            const td_description = tr.insertCell();
            if (item.LocalizedDescriptions !== null) {
                td_description.innerHTML = item.LocalizedDescriptions[language]
            }
        } catch (error) {
            console.error("could not render item:", item)
        }
    })
}

document.getElementById("search_form").addEventListener("submit", (event) => {
    event.preventDefault();
    const search = document.getElementById("search_box").value.toLowerCase()
    const filtered_list = items.getFilteredList(search)
    renderItems(filtered_list)
})

function handleItemAction(item_id) {
    const item_info = items.getItemInfo(item_id)
    console.log('item_info', item_info)

    getItemCurrentData(item_id)
    .then((data => {
        console.log(data)
        const item_info_table_body = document.getElementById("item_info_table_body")
        item_info_table_body.innerHTML = ""

        data.forEach((item) => {
            try {
                const tr = item_info_table_body.insertRow()

                const td_image = tr.insertCell()
                td_image.innerHTML = `<img 
                    src="${getItemImage(item.item_id, item.quality)}" 
                    width="70vw"
                    class="m-0" 
                    alt="Enchantment ${item.quality-1}"
                >`

                const td_city = tr.insertCell();
                td_city.innerHTML = item.city
                
                const td_buy_price = tr.insertCell()
                td_buy_price.innerHTML = item.buy_price_min + " - " + item.buy_price_max
                
                const td_sell_price = tr.insertCell()
                td_sell_price.innerHTML = item.sell_price_min + " - " + item.sell_price_max

            } catch (error) {
                console.error("could not render item:", item)
            }
        })
        
    }))
    .catch((error) => console.error(error))

    
}
