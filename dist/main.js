apiRecipes = new recipesModel(); //apiRecipes=>recepesModel

const search = function (check) {
  let gluten = "gluten";
  let glutenChecked = $("#gluten").prop("checked");
  console.log("Gluten Checked:", glutenChecked);

  let searchByName = $("#search-by-name").val();
  if (glutenChecked == true) {
    apiRecipes.fetch(searchByName, gluten);
  }
};

$("#search-button").on("click", function () {
  search();
});
