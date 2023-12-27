apiRecipes = new recipesModel(); //apiRecipes=>recepesModel

const search = function () {
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
  if (glutenChecked == false && dairyChecked == false) {
    apiRecipes.fetch(searchByName, null);
  }
  paginationn(search);
};

$("#search-button").on("click", function () {
  search();
});
const paginationn = function (data) {
  const prevButton = $("#prev");
  const nextButton = $("#next");
  const pageNumberValue = data.length / 5;
  prevButton.$("click", () => {
    if (endIndex < 20) {
      startIndex = 0;
      endIndex = 10;
    } else {
      startIndex -= 10;
      endIndex -= 10;
      pageNumber -= 1;
    }
    pageNumberValue.value = pageNumber;
    mapData();
  });

  nextButton.$("click", () => {
    if (endIndex < dataSet.length) {
      startIndex += 10;
      endIndex += 10;
      pageNumber += 1;
    }
    pageNumberValue.value = pageNumber;
    mapData();
  });
};
