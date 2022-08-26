const express = require('express')
const DataComparison = require('../models/dataComparison');

const moment = require('moment')


const dataComparison = new DataComparison()

const orderRoutes = (app) => {
  app.get('/datacomparison', index)

  app.get('/datacomparison/:name/:counter', show)

  app.post('/datacomparison', create)
}

const index = async (_req, res) => {
  try {
    const products = await dataComparison.index()
    res.status(200).json(products)
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

const show = async (req, res) => {
  try {
    const product = await dataComparison.show(req.params.name)

    let repeticiones = parseInt(req.params.counter);
    let i = 1;

    if (repeticiones <= 1){
      res.status(200).json(product)
    }else{
      while(repeticiones > 1){
        product.ph[0].series.push(product.ph[0].series[0])
        product.tds[0].series.push(product.tds[0].series[0])
        product.turbidity[0].series.push(product.turbidity[0].series[0])
        product.temperature[0].series.push(product.temperature[0].series[0])
        repeticiones--;
        i++;
      }
      res.status(200).json(product)
    }
  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}
const create = async (req, res) => {

  try {

  if (req.body.name && comprobar_data(req.body.ph[0]) && comprobar_data(req.body.tds[0]) && comprobar_data(req.body.turbidity[0]) && comprobar_data(req.body.temperature[0]))
  {

    const sensor = {
      name: req.body.name,
      ph: [
        {
          name: req.body.ph[0].name,
          series: [req.body.ph[0].series[0]]
        }
      ],
      tds:[
        {
          name: req.body.tds[0].name,
          series: [req.body.tds[0].series[0],]
        }
      ],
      turbidity:[
        {
          name: req.body.turbidity[0].name,
          series: [req.body.turbidity[0].series[0],]
        }
      ],
      temperature: [ {
        name: req.body.temperature[0].name,
        series: [req.body.temperature[0].series[0]]
      }
      ]
    }

    const newProduct = await dataComparison.create(sensor)
    res.status(200).json(newProduct)
  }else{
    res.status(400).send(` 1 Error -> faltan datos`)
  }

  } catch (error) {

    res.status(400).send(`Error -> ${error}`)
  }
}

function comprobar_data(data){

  // console.log(data);

  if (data.name && data.series[0] && data.series[0].name && data.series[0].value && (data.series[0].min || data.series[0].min === 0 ) && (data.series[0].max || data.series[0].max === 0 )){
    return 1;
  }else{
    return 0;
  }
}

module.exports = orderRoutes