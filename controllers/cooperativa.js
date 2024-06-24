const Cooperativa = require('../models/cooperativa');
const { response } = require('express');

const getCooperativa = async (req, resp) => {
  try {
    const cooperativa = await Cooperativa.find();
    resp.json({
      ok: true,
      cooperativa
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
};

const newCooperativa = async (req, resp) => {
  try {
    const cooperativa = new Cooperativa(req.body);
    await cooperativa.save();
    resp.json({
      ok: true,
      cooperativa
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
};

const actualizarCooperativa = async (req, resp) => {
  const uid = req.params.id;

  try {
    const CooperativaDB = await Cooperativa.findById(uid);

    if (!CooperativaDB) {
      return resp.status(404).json({
        ok: false,
        msg: 'No existe una Cooperativa con ese id'
      });
    }

    const cooperativa = await Cooperativa.findByIdAndUpdate(uid, req.body, {
      new: true
    });

    resp.json({
      ok: true,
      cooperativa
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      ok: false,
      msg: 'Error inesperado... revisar logs'
    });
  }
};

const eliminarCooperativa = async (req, resp) => {
  const uid = req.params.id;

  try {
    const CooperativaDB = await Cooperativa.findById(uid);

    if (!CooperativaDB) {
      return resp.status(404).json({
        ok: false,
        msg: 'No existe una Cooperativa con ese id'
      });
    }

    await Cooperativa.findByIdAndDelete(uid);

    resp.json({
      ok: true,
      msg: 'Cooperativa eliminada'
    });
  } catch (error) {
    resp.json({
      ok: true,
      msg: 'Error inesperado... revisar logs'
    });
  }
};

module.exports = {
  getCooperativa,
  newCooperativa,
  actualizarCooperativa,
  eliminarCooperativa
};
