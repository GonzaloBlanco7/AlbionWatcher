import Items from './Items.mjs';

function getLanguage() {
    const language = document.querySelector('input[name="language"]:checked').value
    return language
}


function renderItems(items) {
    console.log("Rendering items:", items)
    const language = getLanguage()
    const items_table_body = document.getElementById("items_table_body")
    items_table_body.innerHTML = "" //Clear

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
            td_id.innerHTML = item.UniqueName
            const td_tier = tr.insertCell()
            if (item.tier != undefined) {
                td_tier.innerHTML = item.tier
            }
            const td_name = tr.insertCell();
            td_name.innerHTML = item.LocalizedNames[language]
        } catch (error) {
            console.error("could not render item:", item)
        }
    })
}

items = new Items();
await items.loadItems()
renderItems(items.item_list)