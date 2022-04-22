import { join } from "path";
import express from "express";
import { json, urlencoded } from "body-parser";

import { getAll, insert, update, remove } from "./client";

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  getAll(null, (err, data) => {
    if (!err) {
      res.render("customers", {
        results: data.customers,
      });
    }
  });
});

app.post("/save", (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  insert(newCustomer, (err, data) => {
    if (err) throw err;

    console.log("Customer created successfully", data);
    res.redirect("/");
  });
});

app.post("/update", (req, res) => {
  const updateCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  update(updateCustomer, (err, data) => {
    if (err) throw err;

    console.log("Customer updated successfully", data);
    res.redirect("/");
  });
});

app.post("/remove", (req, res) => {
  remove({ id: req.body.customer_id }, (err, _) => {
    if (err) throw err;

    console.log("Customer removed successfully");
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
