var wishList = JSON.parse(localStorage.getItem("jesslist"));
var wishList = undefined;
let toggleButton = document.getElementById('toggleButton');

if (wishList) {
    wishList = _.orderBy(wishList, ['purchased'], ['asc']);
    wishList.forEach(appendToDom);
}

toggleButton.addEventListener('click', togglePurchased);

$.get('./main.php', function(data) {
    if (wishList != data) {
        localStorage.setItem('jesslist', data);
        data = JSON.parse(data);
        $('#ul').text('');
        data = _.orderBy(data, ['purchased'], ['asc']);
        data.forEach(appendToDom);
    }
});

function appendToDom(element) {
    var del = '<del>';
    var link = '<li class="item"><a target="_blank" href="' + element.url  + '">' + element.displayname  + '</a></li>';
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
