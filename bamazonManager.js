var mysql = require('mysql');
var inquirer = require('inquirer');

////////////////////////////////////variable
var change;


//////////////////////////////////////////CONNECT TO DATABASE

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mysql11',
  database: 'Bamazon2DB'
})

///////////////////////////////////////CREATE INITIAL CONNECTION

connection.connect(function(err) {
  if (err) throw err;
  
});

//////////////////////////////////INITIAL MENU

function menu() {
inquirer.prompt(
{
    type: "list",
    message: "\nWhat would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    name: "request"
  }).then(function(answers) {

    if (answers.request === "View Products for Sale") {
    start();
  }
  else if (answers.request === "View Low Inventory") {
    low();
  }
  else if (answers.request === "Add to Inventory") {
    add1();
  }
  else if (answers.request === "Add New Product") {
    add2();
  }

  })
};
///////////////////////////////////////////READ / WRITE 


var start = function() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    // for (i=0; i<result.RowDataPacket.length; i++) {
   console.log("*******************ITEMS FOR SALE *****************");
    for (i=0; i<result.length; i++){
    console.log("\nItem ID: "+ result[i].Item_id + " | Product: " + result[i].Product_name + " | Department: " + result[i].Department_name +  " | Price: " + result[i].Price + " | In Stock:   "+ result[i].Stock_quantity) +"\n\n";

  }
   menu();
  });
 
};

function low() {
  connection.query("SELECT * FROM products WHERE Stock_quantity<5", function(err, result) {
    if (err) throw err;
    // for (i=0; i<result.RowDataPacket.length; i++) {
   console.log("*******************ITEMS WITH INVENTORY COUNT LOWER THAN FIVE *****************");
    for (i=0; i<result.length; i++){
    console.log("\nItem ID: "+ result[i].Item_id + " | Product: " + result[i].Product_name + " | Department: " + result[i].Department_name +  " | Price: " + result[i].Price + " | In Stock:   "+ result[i].Stock_quantity) +"\n\n";
  }
  menu();
})
  

}
function add1() {

connection.query("SELECT * FROM products", function(err, results) {
  if (err) throw err;
change=results.length;
console.log("\n");
    inquirer.prompt([{
      name: "id",
      type: "input",
      message: "What is the ID of the product that you would like to add to?",
       validate: function(value) {
        if ((isNaN(value) === false) && (value>0 && value<=change)) {
        return true;
      }
      return false;
    }
  },
    {
      name: "units",
      type: "input",
      message: "How many units would you like to add?",
       validate: function(value) {
       if ((isNaN(value) === false)) {
        return true;
      }
      return false;
    }
   //results closeed) 
    }]).then(function(answers) {

      // if (answers.id <1 || answers.id >results.length) {
      // console.log("\nThis id doesn't exist");
      // add1();

   console.log("\n\nYou want to add " + answers.units + " of product no. " + answers.id);
 
   connection.query("SELECT * FROM products WHERE ?",{Item_id: answers.id}, function(err, results2){
    if (err) throw err;

connection.query("UPDATE products SET ? WHERE ?", [{
  Stock_quantity: results2[0].Stock_quantity+parseInt(answers.units)
}, {
  Item_id: answers.id
}], function(err, res) {
  console.log("\nWe added " + answers.units + "of product no. " + answers.id +"\n");
   menu();
});
});//results2

}) // function answers
   
 })//results closed was here 

} //add1 

function add2() {


console.log("\n ******************ADD MORE ITEMS********************\n");
    inquirer.prompt([{
      name: "Product_name",
      type: "input",
      message: "What is the name of the produt that you would like to add?"
       
  },
    {
      name: "Department_name",
      type: "input",
      message: "In what department does this product belong?"
       
    },
    {
       name: "Price",
      type: "input",
      message: "How much will each of these items cost?"
    },
    {
       name: "Stock_quantity",
      type: "input",
      message: "How many of these items are you adding?"

    }]).then(function(answers) {

 connection.query("INSERT INTO products SET ?", {
  Product_name: answers.Product_name,
  Department_name: answers.Department_name,
  Price: answers.Price,
  Stock_quantity: answers.Stock_quantity 
}, function(err, res) {});

   console.log("\nITEM SUCCESSFULLY ADDED\n");
 
  menu();
})
   } 
  
menu();
