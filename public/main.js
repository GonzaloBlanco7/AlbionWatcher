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
            td_action.innerHTML = `
                <button 
                    class="btn btn-info item_action" 
                    onclick="handleItemAction('${item.UniqueName}')" 
                >
                    View
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

