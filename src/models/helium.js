const {Firestore} = require('@google-cloud/firestore');

// const firestore = new Firestore();
const db = new Firestore({
  projectId: 'acercamientos-al-agua',
  keyFilename: './secret/acercamientos-al-agua-43785d491035.json',
});


class HeliumStore {
  async create(b) {
    try {
			const res = await db.collection('helium').doc().set({data: b});

      if (res){
        return  `Create : ${b}`;
      }else{
        return "Error";
      }
			// const document = firestore.doc('helium');

			// // Enter new data into the document.
			// await document.set({
			// 	data: b,
			// });

			console.log(`Create : ${b}`);
      return  `Create : ${b}`;
    } catch (err) {
      throw new Error(`2 - Could not add new product. Error: ${err}`)
    }
  }
}

module.exports = HeliumStore