
function getItemCurrentData(item_id) {
    //DOC: https://www.albion-online-data.com/

    let [id, quality] = item_id.split('@');
    quality = Number(quality) + 1

    //if item_id is array -> item_id = item_id.join(",")
    const ITEM_INFO_URL = 'https://www.albion-online-data.com/api/v2/stats/prices/' + id + '.json?qualities=' + quality;

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
                .then(data => data.sort((a, b) => a.quality - b.quality)) //sort by item quality
                .then(data => resolve(data));

        } catch (e) {
            reject(e);
        }
    })
}

function getItemImage(item_id, quality=1) {
    item_id = item_id.split("@")[0]
    
    let image_url = "https://albiononline2d.ams3.cdn.digitaloceanspaces.com/thumbnails/orig/" + item_id

    //echantment 0 -> quality = 1 -> no @
    //enchantent 1 -> quality = 2 -> @1
    //enchantent 2 -> quality = 3 -> @2
    //enchantent 3 -> quality = 4 -> @3
    if (quality > 1) {
        image_url += "@" + (quality-1)
    }

    return image_url
}

