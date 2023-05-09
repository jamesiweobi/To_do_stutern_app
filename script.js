class Human {
  constructor(name, age, hobbies){
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  callName(){
    console.log(this.name, "THE NAME HAS BEEN CALLED")
  }
}

const newHuman = new Human('Adam', 45,)
// const newHuman = new Human('Adam', 45, ['farmer', "eating forbidden fruits", 'eve'])


class Male extends Human {
  constructor(name, age, hobbies){
    super(name, age, hobbies)
    this.sex = "male"
  }
}

// console.log(newHuman)
// newHuman.callName()

const newMale = new Male('Adam', 45, ['farmer', "eating forbidden fruits", 'eve'])
const newMale2 = new Male('Everet', 23, ['footballer', "gym", 'snooker'])

newMale.callName()
console.log(newMale2)