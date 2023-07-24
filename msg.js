const h1 = {
    name:"jaydip",
    abc: function(){
        console.log(`Hello ${this.name}`);
    }
}

const h2 = {
    surname:"jaydip makwana",
    mjp: function(){
         console.log(`Hello1 ${this.name}`);
    }
}

module.exports = {
    first:h1,
    second:h2,
}