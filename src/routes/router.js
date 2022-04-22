import { Router } from "express";
import { getAll, insert, update, remove } from "./client";

const router = Router();

router.get("/", (req, res) => {
  getAll(null, (err, data) => {
    if (!err) {
      res.render("customers", {
        results: data.customers,
      });
    }
  });
});

router.post("/save", (req, res) => {
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

router.post("/update", (req, res) => {
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

router.post("/remove", (req, res) => {
  remove({ id: req.body.customer_id }, (err, _) => {
    if (err) throw err;

    console.log("Customer removed successfully");
    res.redirect("/");
  });
});

export { router };