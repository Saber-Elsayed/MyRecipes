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

// var apiUrl = `https://api.giphy.com/v1/gifs/search`;

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
      // console.log(resp.data.results[0]);
      _data = resp.data.results.map((key) => {
        return {
          idMeal: key.idMeal,
          ingredients: key.ingredients,
          title: key.title,
          thumbnail: key.thumbnail,
          href: key.href,
        };
      });
      // for (let i = 0; i < _data.length; i++) {
      //   axios
      //     .get(
      //       "https://api.giphy.com/v1/gifs/search?q=food&api_key=DkXwCsnJYHKPNdrBVVJFNhTrVip6BfUx"
      //     )
      //     .then((resp) => {
      //       let resUrl = resp.data.data[0].url;
      //       console.log(resUrl);

      //       _data[i].thumbnail = resUrl;
      //       console.log(_data);
      //     });
      // }
      // console.log(_data);
      // for (let i = 0; i < _data.length; i++) {
      //   _data[i].button = randomName;
      // }
      // console.log("url" + apiUrl);

      if (alrg === "gluten") {
        contentGluten();
      }

      if (alrg === "dairy") {
        contentdair();
      }
      console.log(_data);
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

const contentdair = function () {
  for (let i = 0; i < _data.length; i++) {
    newData = _data[i].ingredients.filter(function (element) {
      return contentdairy.includes(element);
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
