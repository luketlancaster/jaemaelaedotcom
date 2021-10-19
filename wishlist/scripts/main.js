const url =
  "https://opensheet.vercel.app/11_IF6m6s-oHl4Mq0xLWJ5NYAfh8S1VJEkzWqzMkv2Lw/birthday";

// $.get(url, function (data) {
//   let date = new Date(data.feed.updated.$t);
//   $("#date").text(`Last Updated: ${date.toLocaleDateString()}`);
//   data.feed.entry.forEach((item) => {
//     // BIZ RULE: don't display purchased items
//     if (!item.gsx$purchased.$t) {
//       appendToDom({
//         url: item.gsx$url.$t,
//         displayName: item.gsx$displayname.$t,
//         purchased: item.gsx$purchased.$t,
//         priority: item.gsx$priority.$t,
//       });
//     }
//   });
// });

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((row) => appendToDom(row));
  });

const appendToDom = (element) => {
  if (element.purchased) return;
  let link = `
        <li class="item">
            <a target="_blank" href="${element.url}">${element.display_name}</a>
            <p class="priority">${element.priority ? element.priority : ""}</p>
        </li>`;

  $("#ul").append(link);
};
