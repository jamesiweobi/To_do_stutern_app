export class NotFoundError extends Error {
  constructor(message){
    super(message)
    this.status = 404;
    this.errorType = "NotFoundError";
  }
}

export class BadUserRequestError extends Error {
  constructor(message){
    super(message)
    this.status = 400;
    this.errorType = "BadUserRequestError";
  }
}
export class UnAuthorizedError extends Error {
  constructor(message){
    super(message)
    this.status = 401;
    this.errorType = "UnAuthorizedError";
  }
}

// class Error {
//   constructor(message) {
//     this.message = message
//   }
// }


// new NotFoundError("The user does not exist")


// class Human {
//   constructor(name, age,){
//     this.name = name;
//     this.age = age
//   }
// }

// class Female extends Human {
//   constructor(name, age,){
//     super(name, age)
//     this.sex = "Female"
//   }
// }



// class Male extends Human {
//   constructor(name, age,){
//     super(name, age)
//     this.sex = "Male"
//   }
// }




//  new Male("Adam", 45) = {
//   name: "Adam",
//   age: 45,
//   sex: "male"
// }