"use strict";

console.log(`
1.
---

There is database of users and their hats at './database.json'.
Find the total sum of the top-3 most selling hats.
We don't care which hats are.
You can use lodash/underscore (recommended)

What is the complexity in O() notation of time and space?

IMPORTANT: Find a balance between performance and legibility (more important).

---
Example:
Imagine the following (taken from the real database):

Hat(7adbc650-2a5e-4e59-b88f-97377e0b7e34) sold 7.
Hat(872f5fc4-515f-416d-9ec6-3488da2bd74a) sold 6.
Hat(048d8fbf-7653-461f-a59c-68c73b8855e5) sold 7.
Hat(32266d28-5092-4a69-afb3-90fafd46e04a) sold 9.

-> Expected result: 7 + 7 + 9 => 23
`);

const _ = require("lodash"); // https://lodash.com/docs/4.17.4
const assert = require("assert");

const database = require("./database.json");
const hats = getHats(database);
const quantityTop = getQuantityTop(hats, 3);
const total = _.sum( quantityTop );

// Throws error on failure
assert.equal(total, 23, `Invalid result: ${total} != 23`);

console.log('Success!');



/**
 * Retorna el top de elementos según su cantidad
 * 
 * @param element
 * @param quantity
 */
function getQuantityTop(element, quantity) {
  let list = _.orderBy(element, ["quantity"], ["desc"]);

  let i = 0;
  let topList = [];

  for (let hat of list) {
    topList.push(hat.quantity);
    i++;

    if (i === quantity) {
      break;
    }
  }

  return topList;
}

/**
 * Retorna la lista de sombreros
 * y la cantidad de veces que se ha vendido
 *
 * @param database
 * @return Array
 */
function getHats(database) {
  let hats = [];

  _.forEach(database, user => {
    _.forEach(user.hats, hat => {
      const existHat = _.find(hats, { id: hat.id });

      if (existHat) {
        // si ya existe aumentamos la cantidad de ventas
        existHat.quantity += 1;
      } else {
        // insertamos un nuevo sombrero a la lista
        let newHat = {};
        newHat.id = hat.id;
        newHat.quantity = 1;
        hats.push(newHat);
      }
    });
  });

  return hats;
}
