const {car,carcom} = require('./car')

console.log("carname is:-"+ car.carname);
console.log("carprice is:-"+ car.carprice);
console.log("carbrand is:-"+ car.carbrand);
console.log("cartype is:-"+ car.cartype);

for(let i = 0; i<carcom.length;i++){
    console.log("carcompany is:-"+ carcom[i]);
}