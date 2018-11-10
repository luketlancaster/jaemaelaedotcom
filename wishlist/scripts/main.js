// Specific to the wishlist spredsheet. Won't work with others :/
const url = 'https://spreadsheets.google.com/feeds/list/11_IF6m6s-oHl4Mq0xLWJ5NYAfh8S1VJEkzWqzMkv2Lw/od6/public/full?alt=json';

$.get(url, function (data) {
    data.feed.entry.forEach(item => {
        // BIZ RULE: don't display purchased items
        if (!item.gsx$purchased.$t) {
            appendToDom({
                'url': item.gsx$url.$t,
                'displayName': item.gsx$displayname.$t,
                'purchased': item.gsx$purchased.$t,
                'priority': item.gsx$priority.$t
            })
        }
    });
})

function appendToDom(element) {
    var link = `
        <li class="item">
            <a target="_blank" href="${element.url}">${element.displayName}</a>
            <p class="priority">${element.priority}</p>
        </li>`;
    if (element.purchased === '1') {
        link = `<del>${link}</del>`;
    }
    $('#ul').append(link);
}
