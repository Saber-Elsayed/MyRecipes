const source = $("#searchtemp-template").html();
const template = Handlebars.compile(source);

const render = function (search) {
  data = filteValues(search);
  $("#Recipes").empty();
  let newHtml = template(data);
  $("#Recipes").append(newHtml);
};

const filteValues = function (search) {
  let data = [];
  for (let i = 0; i < search.length; i++) {
    if (search[i] != null) {
      data[i] = search[i];
    }
  }

  return data;
};