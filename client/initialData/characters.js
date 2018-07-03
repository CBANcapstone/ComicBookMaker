const charactersArr = [
  'https://sonny.js.org/react-komik/dist/char2.png',
  'https://sonny.js.org/react-komik/dist/char2_magic.png',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2Fchar1.png?alt=media&token=3cd5f450-a772-4e03-b52e-ebde742ad7b4',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F1.svg?alt=media&token=2d63f998-e53f-43d3-a32b-2a6e950f13b0',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F2.svg?alt=media&token=baf3cce1-9a27-42e1-8b16-ae3ced7adfb8',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F3.svg?alt=media&token=aebe7337-89d0-4559-8515-df1c8e1dda0d',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F4.svg?alt=media&token=7d107f47-fecc-47fe-a42a-13bacd9fca83',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F5.svg?alt=media&token=90614edd-7b08-4920-a502-98e9d6f1a94a',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F6.svg?alt=media&token=697bb0a1-bdc5-4f53-b6b9-420c26e5705b',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F7.svg?alt=media&token=f590aedb-a996-4d7f-869c-1d1095661f2a',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2F8.svg?alt=media&token=26fc555f-02e1-4898-b2db-930e02c9a789',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FBatman.svg?alt=media&token=6e06fa2d-f553-4819-a786-e4f49acb9f05',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FCaptainAmerica.svg?alt=media&token=1d17b586-fa75-48aa-bd4e-604ed37ba8ec',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FCatwoman.svg?alt=media&token=321b2530-7a9e-429a-b5ce-f998db5152a2',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FIronman.svg?alt=media&token=d01604fd-8c32-49fe-9eb1-d1dd11a0a04b',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FSpiderman.svg?alt=media&token=fda61ed6-b9c9-433c-ab4a-17718d9337a4',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/templates%2FMarvel%2FSuperman.svg?alt=media&token=2ff37cad-a74c-40f6-9dd8-03810f97917b',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fvillian.png?alt=media&token=a2d778bc-3f35-4655-8f68-fc9d004e5a4f',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fsupervillain.png?alt=media&token=5f636ba7-85b0-40e4-b383-ba318d06b8bf',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fsuperheroe.png?alt=media&token=432a1dc0-437c-4ffc-9866-311835557b37',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fsuperheroe-6.png?alt=media&token=636ff8af-4de9-45f0-9858-12a3f0c1926f',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fsmoker.png?alt=media&token=5f241808-368d-432e-8573-f0badd77906d',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Frobot.png?alt=media&token=367f02bc-ed00-4d38-8153-01bd5caad763',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fpsycho-2.png?alt=media&token=d0c81396-0325-4f6b-a785-36427de915aa',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fpoliceman.png?alt=media&token=7c28729c-fa2b-46fe-b415-4d1f3aabe33b',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fguitar-player.png?alt=media&token=791f7002-3eb9-4d85-adcc-6ead30a9e268',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fdoctor.png?alt=media&token=6d9e9fe3-be14-4340-8bd9-059ce3c4bf8b',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Fchemist.png?alt=media&token=fc9667d0-e77d-44aa-84c4-3c73076e2560',
  'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/ava%2Falien-1.png?alt=media&token=c46624f3-d1b8-41e8-ad68-a6a89271ccb1'

];

export default charactersArr;
