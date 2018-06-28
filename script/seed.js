'use strict';

const db = require('../server/db');
const { User, Template } = require('../server/db/models');

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({
      email: 'nick@email.com',
      name: 'Nick Maslov',
      photoUrl:
        'https://media.licdn.com/dms/image/C4D03AQH_Hnc3P-RzlA/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=XgfVC9w8CaWp6Pi3MbhrwC2pzjPahpMpblYoAgRxLPs',
      password: '123'
    }),
    User.create({
      email: 'bushra@email.com',
      name: 'Bushra Taimoor',
      photoUrl:
        'https://media.licdn.com/dms/image/C4D03AQGrrwZbgATTGA/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=riLnsKEP_3Jz4f6rwdmMZVcfpDL9lizD-MybHN_qkdM',
      password: '123'
    })
  ]);

  const templates = await Promise.all([
    Template.create({
      title: 'Alice in Wonderland',
      description: `Alice's Adventures in Wonderland (commonly shortened to Alice in Wonderland) is an 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll.[1] It tells of a girl named Alice falling through a rabbit hole into a fantasy world populated by peculiar, anthropomorphic creatures.`,
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2Falice%20in%20wonderland%2FAlice.in_.Wonderland.full_.1451133-901x605.jpg?alt=media&token=745e7e87-bc0f-4425-a4f4-e8a44fda92df',
      chapters: [
        'Chapter 1: Down the Rabbit-Hole.',
        'Chapter 2: The Pool of Tears.',
        'Chapter 3: A Caucus-Race and a long Tale.'
      ]
    }),
    Template.create({
      title: 'Cinderella',
      description: `Cinderella is a 2015 British-American[3] romantic fantasy film directed by Kenneth Branagh, with a screenplay written by Chris Weitz, and co-produced by Walt Disney Pictures, Kinberg Genre, Allison Shearmur Productions and Beagle Pug Films.`,
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2Fcinderella%2Fcinderellacover.jpg?alt=media&token=9a791c10-a004-4ead-aa06-f1a682ac7ac4',
      chapters: [
        'Chapter 1: Opening Credits.',
        'Chapter 2: Once Upon a Time...',
        'Chapter 3: A Dream Is A Wish Your Heart Makes.'
      ]
    }),
    Template.create({
      title: 'Puss in boots',
      description: `"Master Cat, or The Booted Cat" (Italian: Il gatto con gli stivali; French: Le Maître chat ou le Chat botté), commonly known in English as "Puss in Boots", is a European literary fairy tale about a cat who uses trickery and deceit to gain power, wealth, and the hand of a princess in marriage for his penniless and low-born master.`,
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2Fpuss%20in%20boots%2Fpuss-in-boots-2-jpg.jpg?alt=media&token=36a5cdfe-73a9-4f74-a514-f6774d582991',
      chapters: [
        'Chapter 1: Santa.',
        'Chapter 2: The Toy Factory.',
        'Chapter 3: Puss in Boots.'
      ]
    })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${templates.length} templates`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
