const axios = require("axios");

const http = axios.create({
  baseURL: "http://localhost:8000",
});

module.exports.home = (req, res, next) => {
  res.render("home");
};

module.exports.cities = (req, res, next) => {
  http
    .get("/cities")
    .then((response) => {
      console.log(response.data);

      res.render("cities", { cities: response.data });
    })
    .catch((error) => next(error));
};

module.exports.createCity = (req, res, next) => {
  res.render("new-city");
};

module.exports.doCreateCity = (req, res, next) => {
  // req.body
  if (!req.body.name || req.body.name.length < 2) {
    res.render("new-city", {
      city: { name: req.body.name },
      error: "Introduce a valid name",
    });
  } else {
    http
      .post("/cities", {
        name: req.body.name,
      })
      .then(() => {
        res.redirect("/cities");
      })
      .catch((error) => next(error));
  }
};

module.exports.getCity = (req, res, next) => {
  const id = req.params.id;

  http
    .get(`/cities/${id}`)
    .then((response) => {
      console.log(response.data);

      res.render("detail", { item: response.data });
    })
    .catch((error) => next(error));
};

module.exports.restaurants = (req, res, next) => {
  http
    .get("/restaurants")
    .then((response) => {
      console.log(response.data);

      res.render("restaurants", { restaurants: response.data });
    })
    .catch((error) => next(error));
};

module.exports.getRestaurant = (req, res, next) => {
  const id = req.params.id;

  http
    .get(`/restaurants/${id}`)
    .then((response) => {
      console.log(response.data);

      res.render("detail", { item: response.data });
    })
    .catch((error) => next(error));
};

module.exports.editRestaurant = (req, res, next) => {
  const { id } = req.params;

  Restaurant.findById(id)
    .then((restaurantToEdit) => {
      res.render("restaurant-edit", { restaurant: restaurantToEdit });
    })
    .catch((error) => next(error));
};

module.exports.doEditRestaurant = (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
 
  Restaurant.findByIdAndUpdate(id, { name }, { new: true })
    .then(updatedRestaurant => res.redirect(`/restaurants/${updatedRestaurant.id}`))
    .catch(error => next(error));
};
