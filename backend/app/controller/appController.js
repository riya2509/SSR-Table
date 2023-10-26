import sql, { mysql } from "../../databases/database.js";
import { faker } from "@faker-js/faker";

const appController = {};

appController.generateData = (req, res) => {
  const productArray = Array.from({ length: 1 }, () => ({
    product: faker.commerce.product(),
    name: faker.commerce.productName(),
    department: faker.commerce.department(),
    price: faker.commerce.price(),
    adjective: faker.commerce.productAdjective(),
    isbn: faker.commerce.isbn(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
  }));
  console.log("Data created sucessfully");
  sql.query(
    `INSERT INTO product (product, name, department, price, adjective, isbn, description, material) VALUES ?`,
    [
      productArray.map(
        ({
          adjective,
          department,
          description,
          isbn,
          material,
          name,
          price,
          product,
        }) => [
          product,
          name,
          department,
          price,
          adjective,
          isbn,
          description,
          material,
        ]
      ),
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Database connected at ${new Date().toLocaleString()}`);
      }
    }
  );
  res
    .status(201)
    .send({ status: 1, message: "Data created.", data: productArray });
};

appController.getData = async (req, res) => {
  const columnsArray = [
    "product",
    "id",
    "name",
    "department",
    "price",
    "adjective",
    "isbn",
    "description",
    "material",
  ];
  let { row, page, column, order, value, filter } = req.query;
  row = isNaN(row) || row <= 0 ? 0 : row;
  page = page <= 0 || isNaN(page) ? 0 : (page - 1) * row;
  column = columnsArray.includes(column) ? column : "id";
  filter = columnsArray.includes(filter) ? filter : "id";
  order = ["asc", "desc"].includes(order) ? order : "asc";
  const tableQuery = `SELECT * from product WHERE ${filter} like '%${
    value || ""
  }%' order by ${column} ${order} LIMIT ${row} OFFSET ${page};`;
  const totalRows = `select count(*) as total from product;`;
  try {
    const response = await mysql(tableQuery);
    const [total] = await mysql(totalRows);
    res.send({
      status: 1,
      total: total?.total ?? 0,
      count: (response ?? []).length,
      data: response,
    });
  } catch (error) {
    res.send({ status: 0, message: `Data not found`, error });
  }
  // mysql(tableQuery)
  //   .then((response) => {
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
};

export default appController;
/**
 * While we use async await for promises
 * place whole function/operation into a try catch block
 * place async keyword on immediate outer function
 * and put await keyword before promise function
 */
