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
  console.log('\n*************** Our Products ****************');
});


///////////////////////////////////////////READ / WRITE 


var start = function() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    // for (i=0; i<result.RowDataPacket.length; i++) {
   
    for (i=0; i<result.length; i++){
    console.log("Item ID: "+ result[i].Item_id + " | Product: " + result[i].Product_name + " | Department: " + result[i].Department_name +  " | Price: " + result[i].Price + " | In Stock:   "+ result[i].Stock_quantity);
  }
console.log("\n");
    inquirer.prompt([{
      name: "id",
      type: "input",
      message: "What is the ID of the product that you would like to buy?",
       validate: function(value) {
        if ((isNaN(value) === false) && (value>0 && value<12)) {
        return true;
      }
      return false;
    }
  },
    {
      name: "units",
      type: "input",
      message: "How many units would you like to buy?",
       validate: function(value) {
       if ((isNaN(value) === false)) {
        return true;
      }
      return false;
    }

    }]).then(function(answers) {

     

      if (answers.id <0 || answers.id >11) {
      console.log("\nThis id doesn't exist");
      start();
    }
  

   console.log("\n\nYou've ordered " + answers.units + " of product no. " + answers.id);
  ///////////This selects based on id given above.... and dumps all in RES

  var query = "SELECT * FROM products WHERE ?";

 

  connection.query(query,{Item_id: answers.id}, function(err, result){
    if (err) throw err;


    change=result[0].Stock_quantity-answers.units;
   
    //first connect was here
  

  if (change<0){
      console.log("\n\nBut, unfortunately, we don't have this many - we have " + result[0].Stock_quantity + " in stock ---- try again\n\n");
     
      start();
  }
  else {
    query="UPDATE products SET ? WHERE ?";
    connection.query(query, [{
          Stock_quantity:change
        }, {
          Item_id: answers.id
        }], 
        function(error) {
          if (error) throw err;
          console.log("\n\nUpdated successfully!");
          console.log("\n\nYour total cost will be: " + (result[0].Price*answers.units));
     
      again();
    
          } //function error ends
        ) //second connection ends ---
      } //else
}); //firstconnection
    })   //functionanswers
    // console.log("\t" + result[i].Item_id + "\t" + + "\t\t" + result[i].Department_name + "\t" + result[i].Price + "\t" + result[i].Stock_quantity);
     
  });//first connect 

}; // function start

function again(){
 inquirer.prompt([{
    name: "input",
    type: "confirm",
    message: "\nWould you like to shop again? (y/n)" 
  }]).then(function(answer) {
      if (answer.input) {
        start();
      } 
      else
        {connection.end();}
});
}
start();

