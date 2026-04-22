import {faker} from '@faker-js/faker';


export class FakeDataGen {

 static getFirstName(){
    return faker.person.firstName();
 }

 static getLastName(){
    return faker.person.lastName();
 }

 static getEmail(){
    return faker.internet.email();
 }

 static getUsername(){
    return faker.person.firstName() + faker.number.int({ min: 1, max: 1000 });
 }






}