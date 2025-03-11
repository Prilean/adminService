const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json()); // No need for body-parser


const dbconnect = require('./db_connection.js');
const Product = require('./product_schema.js');

app.put('/update/:id', async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  Product.findOneAndUpdate({"id": parseInt(req.params.id)},
  {
    $set: {
      name,
      description, 
      price,
      category,
      stock
    }
  }, { new: true })
  .then(update_product => {
    if (update_product != null)
      res.status(200).send('Product Updated ' + update_product);
    else
      res.status(404).send('Invalid Product Id ' + req.params.id);
  }) // CLOSE THEN
  .catch(err => {
    return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.id });
  })
  }

);

app.delete('/delete/:id', async (req, res) => {
  Product.findOneAndDelete({ "id": parseInt(req.params.id) })
      .then(deleted_product => {
        if (deleted_product != null) {
          res.status(200).send('Product Deleted Successfully!' + deleted_product);
        }
        else {
          res.status(404).send('Invalid Product Id'  + req.params.id);
        }
      })
      .catch(err => {
        return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
      })
});

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
