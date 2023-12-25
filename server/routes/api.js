const express = require("express");
const router = express.Router();
const axios = require("axios");
const { faker } = require("@faker-js/faker");

const { data, isEmptyObject } = require("jquery");
contentdairy = [
  "Cream",
  "cheese",
  "Milk",
  "Butter",
  "Creme",
  "Ricotta",
  "Mozzarella",
  "Custard",
  "Cream Cheese",
];
contentgluten = [
  "Flour",
  "Bread",
  "Spaghetti",
  "Biscuits",
  "Beer",
  "Butter",
  "Eggs",
];
let _data = [];
let alrg;
// const apiUrl = `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${givedata}`;

// async function fetchData() {
//   try {
//     const response = await axios.get(apiUrl);
//     Data = response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//   }
//   console.log(variable);
// }

// fetchData();
// setTimeout(() => {
//   console.log(Data);
// }, 1000);

router.get("/get/:search/:allergies", function (req, res) {
  searchData = req.params.search;
  alrg = req.params.allergies;
  console.log(req.params.allergies);
  if (!searchData.match(/^[a-z]+$/i)) {
    res.status(400).send({ Error: `${searchData} is not a valid name` });
    return;
  }
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${req.params.search}`
    )
    .then((resp) => {
      _data = resp.data.results.map((key) => {
        return {
          idMeal: key.idMeal,
          ingredients: key.ingredients,
          title: key.title,
          thumbnail: key.thumbnail,
          href: key.href,
        };
      });
      for (let i = 0; i < _data.length; i++) {
        const randomName = faker.person.fullName();
        const secondRandom = faker.number.int(10, 50);

        _data[i].name = randomName;
        _data[i].rating = secondRandom;
      }

      if (alrg === "gluten") {
        contentGluten();
      }
      res.send(_data);
    });
});

const contentGluten = function () {
  for (let i = 0; i < _data.length; i++) {
    newData = _data[i].ingredients.filter(function (element) {
      return contentgluten.includes(element);
    });
    _data[i].ingredients = newData;
  }
};

for (let i = 0; i < _data.length; i++) {
  if (_data[i].ingredients.length === 0) {
    delete _data[i];
  }
}
module.exports = router;
