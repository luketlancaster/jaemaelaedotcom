let toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', togglePurchased);

// Specific to the wishlist spredsheet. Won't work with others :/
let url = 'https://spreadsheets.google.com/feeds/list/11_IF6m6s-oHl4Mq0xLWJ5NYAfh8S1VJEkzWqzMkv2Lw/od6/public/full?alt=json';

$.get(url, function (data) {
    data.feed.entry.forEach(item => {
        console.log(item.gsx$displayname.$t)
        appendToDom({
            'url': item.gsx$url.$t,
            'displayName': item.gsx$displayname.$t,
            'purchased': item.gsx$purchased.$t
        })
    });
})

function appendToDom(element) {
    var del = '<del>';
    var link = '<li class="item"><a target="_blank" href="' + element.url  + '">' + element.displayName  + '</a></li>';
    if (element.purchased === '1') {
        link = del + link + '</del>';
    }
    $('#ul').append(link);
}

function togglePurchased(event) {
    let items = document.getElementsByTagName('del');
    for (item of items) {
        item.classList.toggle('hidden');
    }
}
