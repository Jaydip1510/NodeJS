const abc = {
    name: 'jaydip',
    age:25,
    sayHello:function(){
        return this.name+" "+this.age
    }
}

const xyz = {
    name:'dhoni',
    age:42,
    sayHello:function(){
            return this.name+" "+this.age
    }
}

const pqr = [10,20,30,40,50]

module.exports = {
    abc,xyz,pqr
}