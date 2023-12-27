const source = $("#searchtemp-template").html();
const template = Handlebars.compile(source);

const render = function (search) {
  $.get(
    "https://api.giphy.com/v1/gifs/search?q=food&api_key=DkXwCsnJYHKPNdrBVVJFNhTrVip6BfUx"
  ).then((resp) => {
    let resUrl = resp.data[0].url;
    for (let i = 0; i < search.length; i++) {
      search[i].thumbnail = resUrl;
    }
    $("#Recipes").empty();
    let newHtml = template(search);
    $("#Recipes").append(newHtml);
    console.log(search);
  });

  console.log(search);
  // data = filteValues(search);
  // console.log(data);
  // $("#Recipes").empty();
  // let newHtml = template(search);
  // $("#Recipes").append(newHtml);
};
