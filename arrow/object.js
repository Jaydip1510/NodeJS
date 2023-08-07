const student = {
     rollno : 12,
     name: 'jaydip',
     age: 26,
     address : "panshina",
     gender : "male",

     stud : () =>{
          return this.name+" "+this.age;
     }
}

const employee = {
     name: 'jay',
     age: 25,
     address : "limbdi",
     gender : "male",
     emp : () =>{
        return this.name+" "+this.age;
     }
}

const user = {
    name :"raj",
    age : 21,
    gender : "male",
    user : () =>{
        return this.name+" "+this.age;
    }
}

module.exports = {
    student,employee,user
}