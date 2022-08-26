const express = require('express')
const sensor = require('../models/sensores');
const helium = require('../models/helium.js');

const moment = require('moment')


const sensorStrore = new sensor()
const heliumStrore = new helium()

const orderRoutes = (app) => {
  app.get('/sensor', index)

  app.get('/sensor/:id', show)

  app.post('/create-sensor', create)
  app.post('/helium-post', createHelium)
  app.get('/create-sensor/:data', createURL)
}

const index = async (_req, res) => {
  try {
    const products = await sensorStrore.index()
    res.status(200).json(products)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const show = async (req, res) => {
  try {
    const product = await sensorStrore.show(req.params.id)
    res.status(200).json(product)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const createURL = async (req, res) => {

  try {

  if (cuantasVecesAparece(req.params.data, ",") === 8){

    let arr = req.params.data.split(',');
    console.log("arr: ");
    console.log(arr);
    const sensor = {
      name: arr[0],
      comunity_or_institution: arr[1],
      position_x: Number(arr[2]),
      position_y: Number(arr[3]),
      ph: [
        {
          name: "ph",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[4])
            }
          ],
        },
        // {
        //   name: "Good ph",
        //   series:[
        //     {
        //       name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
        //       value : 7.00,
        //       min:  6.5,
        //       max: 8.5
        //     }
        //   ],
        // }
      ],
      tds:[
        {
          name: "tds",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[5])
            }
          ],
        },
        // {
        //   name: "Good tds",
        //   series:[
        //     {
        //       name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
        //       value : 300,
        //       min:  0,
        //       max: 600
        //     }
        //   ],
        // }
      ],
      turbidity:[
      {
        name: "turbidity",
        series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[6])
            }
          ],
        },
        // {
        //   name: "Good turbidity",
        //   series:[
        //     {
        //       name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
        //       value : 2,
        //       min:  0,
        //       max: 5
        //     }
        //   ],
        // }
      ],
      temperature: [ {
        name: "temperature",
        series:[
          {
            name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
            value : Number(arr[7])
          }
        ],
      },
      // {
      //   name: "Good temperature",
      //   series:[
      //     {
      //       name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
      //       value : 32.2,
      //       min:  30,
      //       max: 35
      //     }
      //   ],
      // }
      ]
    }

    const product = await sensorStrore.show(arr[0])
    if (product.name)
    {
      const newProduct = await sensorStrore.update(sensor, product)
      res.status(200).json(newProduct)
    }else{
      const newProduct = await sensorStrore.create(sensor)
      res.status(200).json(newProduct)
    }
  }else{
    res.status(400).send(`Error -> faltan datos :${cuantasVecesAparece(req.body.data, ",")} <,>`)
  }

  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}
const create = async (req, res) => {

  try {

  if (cuantasVecesAparece(req.body.data, ",") === 8){

    let arr = req.body.data.split(',');
    const sensor = {
      name: arr[0],
      comunity_or_institution: arr[1],
      position_x: Number(arr[2]),
      position_y: Number(arr[3]),
      ph: [
        {
          name: "ph",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[4])
            }
          ],
        },
        {
          name: "Good ph",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : 7.00,
              min:  6.5,
              max: 8.5
            }
          ],
        }
      ],
      tds:[
        {
          name: "tds",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[5])
            }
          ],
        },
        {
          name: "Good tds",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : 300,
              min:  0,
              max: 600
            }
          ],
        }
      ],
      turbidity:[
      {
        name: "turbidity",
        series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : Number(arr[6])
            }
          ],
        },
        {
          name: "Good turbidity",
          series:[
            {
              name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
              value : 2,
              min:  0,
              max: 5
            }
          ],
        }
      ],
      temperature: [ {
        name: "temperature",
        series:[
          {
            name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
            value : Number(arr[7])
          }
        ],
      },
      {
        name: "Good temperature",
        series:[
          {
            name: moment().utcOffset("-05:00").format('MMMM Do YYYY, h:mm:ss a'),
            value : 32,
            min:  30,
            max: 45
          }
        ],
      }
      ]
    }

    const product = await sensorStrore.show(arr[0])
    if (product.name)
    {
      const newProduct = await sensorStrore.update(sensor, product)
      res.status(200).json(newProduct)
    }else{
      const newProduct = await sensorStrore.create(sensor)
      res.status(200).json(newProduct)
    }
  }else{
    res.status(400).send(` 1 Error -> faltan datos :${cuantasVecesAparece(req.body.data, ",")} <,>`)
    console.log(` 1 Error -> faltan datos :${cuantasVecesAparece(req.body.data, ",")} <,>`);
  }

  } catch (error) {

    res.status(400).send(`0 - Error -> ${error}`);
    console.log(`0 - Error -> ${error}`);
    console.log(req.body);
  }
}
const createHelium = async (req, res) => {

  try {

  if (req.body.heliumData){
    const newProduct = await heliumStrore.create(req.body.heliumData)
		res.status(200).json(newProduct)
  }else{
    res.status(400).send(`Error no esta la seccion de heliumData`)
    console.log(` 1 Error -> faltan datos :${cuantasVecesAparece(req.body.data, ",")} <,>`);
  }

  } catch (error) {

    res.status(400).send(`0 - Error -> ${error}`);
    console.log(`0 - Error -> ${error}`);
    console.log(req.body);
  }
}

function cuantasVecesAparece(cadena, caracter){
  var indices = [];
  for(var i = 0; i < cadena.length; i++) {
    if (cadena[i].toLowerCase() === caracter) indices.push(i);
  }
	return indices.length;
}

module.exports = orderRoutes