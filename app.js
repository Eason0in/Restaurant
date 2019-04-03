const express = require("express");
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json").results;
const app = express();
const port = 3000;
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

//index
app.get("/Restaurant/", (req, res) => {
  res.render("index", { restaurants: restaurantList });
});

//點選餐廳切到詳細頁面
app.get("/Restaurant/restaurants/:id", (req, res) => {
  const restaurant = restaurantList.find(item => {
    return item.id === Number(req.params.id);
  });
  res.render("show", { restaurant: restaurant });
});

//搜尋
app.get("/Restaurant/search", (req, res) => {
  const keyword = req.query.keyword;
  const searchRestaurant = restaurantList.filter(item => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: searchRestaurant, keyword: keyword });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
