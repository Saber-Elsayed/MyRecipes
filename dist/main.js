apiRecipes = new recipesModel(); //apiRecipes=>recepesModel

const search = function (check) {
  let gluten = "gluten";
  let dairy = "dairy";
  let glutenChecked = $("#gluten").prop("checked");
  console.log("Gluten Checked:", glutenChecked);

  let dairyChecked = $("#dairy").prop("checked");
  console.log("Gluten Checked:", dairyChecked);

  let searchByName = $("#search-by-name").val();
  if (glutenChecked == true) {
    apiRecipes.fetch(searchByName, gluten);
  }
  if (dairyChecked == true) {
    apiRecipes.fetch(searchByName, dairy);
  }
};

$("#search-button").on("click", function () {
  search();
});
