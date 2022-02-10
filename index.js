const express = require('express');
const app = express();
const port = 3002;
const mysql = require('mysql');
require('dotenv').config(); // to read module process

// suport json
app.use(express.json());

const connection = mysql.createPool({
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

// migration database
connection.query('create table if not exists products (id int(11) not null auto_increment, productName varchar(255) not null, stock int(11) not null, price int(11) not null, productImage text null, createdAt datetime not null default current_timestamp, updatedAt datetime not null default current_timestamp on update current_timestamp, primary key (id)) engine innodb', () => {});
connection.query('create table if not exists cart_logs (id int(11) not null auto_increment, createdAt datetime not null default current_timestamp, updatedAt datetime not null default current_timestamp on update current_timestamp, primary key (id)) engine innodb', () => {});
connection.query('create table if not exists product_transaction (id int(11) not null auto_increment, productId int(11) not null, cartLogId int(11) not null, amount int(11) not null, total int(11) not null, createdAt datetime not null default current_timestamp, updatedAt datetime not null default current_timestamp on update current_timestamp, primary key (id)) engine innodb', () => {});

app.get('/', (req, res) => {
  res.send('Shipping Cart');
});

app.get('/v1/products', (req, res) => {
  const query = 'select * from products';
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: 'internal server error'
      });
    }
    return res.status(200).send({
      message: 'data products',
      data: result
    })
  });
});

app.post('')

app.listen(port, () => {
  console.log(`Shipping Cart API running at http://localhost:${port}`);
});