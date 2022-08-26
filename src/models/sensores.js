const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'acercamientos-al-agua',
  keyFilename: './secret/acercamientos-al-agua-43785d491035.json',
});

class SensorStore {
  async index() {
    try {
      let list_array = [];

      const citiesRef = db.collection('sensores');
      const snapshot = await citiesRef.get();

      snapshot.forEach((doc) => {
        list_array.push(doc.data())
      });

      return list_array
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  async show(name) {
    try {
      const cityRef = db.collection('sensores').doc(name);
      const doc = await cityRef.get();

      if (!doc.exists) {
        console.log('No such document!');
        return 'No such document!'
        // throw new Error(`Could not find ${name}. Error: ${err}`)
      }else{
        return doc.data()
      }
    } catch (err) {
      throw new Error(`Could not find orders ${name}. Error: ${err}`)
    }
  }

  async create(b) {
    try {
      const res = await db.collection('sensores').doc(b.name).set(b);

      if (res){
        return  `Create : ${b.name}`;
      }else{
        return "Error";
      }
    } catch (err) {
      throw new Error(`2 - Could not add new product. Error: ${err}`)
    }
  }
  async update(b, all) {
    try {
      const dataRef = db.collection('sensores').doc(b.name);

      all.ph[0].series.push(b.ph[0].series[0])
      all.tds[0].series.push(b.tds[0].series[0])
      all.turbidity[0].series.push(b.turbidity[0].series[0])
      all.temperature[0].series.push(b.temperature[0].series[0])

      // all.ph[1].series.push(b.ph[1].series[0])
      // all.tds[1].series.push(b.tds[1].series[0])
      // all.turbidity[1].series.push(b.turbidity[1].series[0])
      // all.temperature[1].series.push(b.temperature[1].series[0])

      const unionRes = await dataRef.update({
        ph: all.ph,
        tds: all.tds,
        turbidity: all.turbidity,
        temperature: all.temperature
      });

      if (unionRes){
        return  `new Update : ${b.name}`;
      }
      return "Error";
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`)
    }
  }
}

module.exports = SensorStore