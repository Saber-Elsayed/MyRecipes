class recipesModel {
  constructor() {}
  fetch(search, allergies) {
    axios
      .get(`/get/${search}/${allergies}`)
      .then(function (response) {
        render(response.data);
      })
      .catch(function (error) {
        console.log(`no such ${search} world`);
      });
  }

  dairy() {
    console.log("ch");
    $.get("/gluten").then(function (response) {
      console.log("kkk");
      console.log(response);
      renderdairy(response);
    });
  }
}
