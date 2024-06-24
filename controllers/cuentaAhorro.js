const CuentaAhorro = require('../models/cuentaAhorro');
const { response } = require('express');

class CuentaAhorroController {
  static async getCuentaAhorro(req, resp) {
    try {
      const cuentaAhorro = await CuentaAhorro.find();
      resp.json({
        ok: true,
        cuentaAhorro
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async newCuentaAhorro(req, resp) {
    try {
      const cuentaAhorro = new CuentaAhorro(req.body);
      await cuentaAhorro.save();
      resp.json({
        ok: true,
        cuentaAhorro
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async actualizarCuentaAhorro(req, resp) {
    const uid = req.params.id;

    try {
      const CuentaAhorroDB = await CuentaAhorro.findById(uid);

      if (!CuentaAhorroDB) {
        return resp.status(404).json({
          ok: false,
          msg: 'No existe una CuentaAhorro con ese id'
        });
      }

      const cuentaAhorro = await CuentaAhorro.findByIdAndUpdate(uid, req.body, {
        new: true
      });

      resp.json({
        ok: true,
        cuentaAhorro
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async eliminarCuentaAhorro(req, resp) {
    const uid = req.params.id;

    try {
      const CuentaAhorroDB = await CuentaAhorro.findById(uid);

      if (!CuentaAhorroDB) {
        return resp.status(404).json({
          ok: false,
          msg: 'No existe una CuentaAhorro con ese id'
        });
      }

      await CuentaAhorro.findByIdAndDelete(uid);

      resp.json({
        ok: true,
        msg: 'Cuenta ahorro eliminado'
      });
    } catch (error) {
      resp.json({
        ok: true,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }
}

module.exports = CuentaAhorroController;
