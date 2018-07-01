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
      title: 'Spiderman',
      description:
        'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.',
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FSpiderman%2Fspidy.jpg?alt=media&token=60985e32-453a-4273-93b8-0623118cc2d6',
      chapters: [
        'Peter Parker the nerd',
        'Experiment Gone Wrong',
        'Do I have powers ...'
      ]
    }),
    Template.create({
      title: 'Ironman',
      description:
        'Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.',
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FIronman%2Firon.jpg?alt=media&token=928b1e70-36c2-409a-8662-6be519548d07',
      chapters: [
        'Ironman the begining',
        'Technology has the power',
        'Eternal Life ...'
      ]
    }),
    Template.create({
      title: 'Captain America',
      description:
        'Vowing to serve his country any way he could, young Steve Rogers took the super soldier serum to become Americas one-man army. Fighting for the red, white and blue for over 60 years, Captain America is the living, breathing symbol of freedom and liberty',
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FCaptain%20America%2Fmarvel-captain-america-premium-format-figure-sideshow-feature-300524-1.jpg?alt=media&token=b1d560b7-279a-4685-9011-2c58d0a8aac7',
      chapters: [
        'From soldier to superhero',
        'Fight for freedom & liberty',
        'Leading the country to safety ...'
      ]
    }),
    Template.create({
      title: 'Avengers',
      description:
        'Earths Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle. With a roster that has included Captain America, Iron Man, Ant-Man, Hulk, Thor, Wasp and dozens more over the years, the Avengers have come to be regarded as Earths No. 1 team.',
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FAvengers%2Favengers.jpg?alt=media&token=77763957-172b-4bbe-989f-0f02f82d81af',
      chapters: [
        'Threats to Earth asks super heroes to unite',
        'Team of supers unite to save the world',
        'Fight the villains ...',
        'Insipiring next generation to join in ...'
      ]
    }),
    Template.create({
      title: 'Batman',
      description:
        'Detective. Whatever you know him as, wherever you know him from - Batman is proof you don’t need superpowers to be a superhero… and the poster boy for what a bad childhood can do to you.',
      coverImgUrl:
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FBatman%2Fbatman-4.jpg?alt=media&token=1da9664c-a4ec-4bbd-b015-2319ea69640d',
      chapters: [
        'City needs a saviour',
        'From a businessman to batman ',
        'Fighting Villains',
        'Anyone can make a difference'
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
