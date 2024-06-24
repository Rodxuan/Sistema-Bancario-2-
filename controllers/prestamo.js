const Prestamo = require('../models/prestamo');
const { response } = require('express');

class PrestamoController {
  static async getPrestamo(req, resp) {
    try {
      const prestamo = await Prestamo.find();
      resp.json({
        ok: true,
        prestamo
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async newPrestamo(req, resp) {
    try {
      let Montointeres = (req.body.balance * req.body.interes) / 100;
      const prestamo = new Prestamo({ ...req.body, Montointeres });
      await prestamo.save();
      resp.json({
        ok: true,
        prestamo
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async actualizarPrestamo(req, resp) {
    const uid = req.params.id;

    try {
      const PrestamoDB = await Prestamo.findById(uid);

      if (!PrestamoDB) {
        return resp.status(404).json({
          ok: false,
          msg: 'No existe un Prestamo con ese id'
        });
      }

      let Montointeres = (req.body.balance * req.body.interes) / 100;

      const prestamo = await Prestamo.findByIdAndUpdate(
        uid,
        { ...req.body, Montointeres },
        { new: true }
      );

      resp.json({
        ok: true,
        prestamo
      });
    } catch (error) {
      console.log(error);
      resp.status(500).json({
        ok: false,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }

  static async eliminarPrestamo(req, resp) {
    const uid = req.params.id;

    try {
      const PrestamoDB = await Prestamo.findById(uid);

      if (!PrestamoDB) {
        return resp.status(404).json({
          ok: false,
          msg: 'No existe un Prestamo con ese id'
        });
      }

      await Prestamo.findByIdAndDelete(uid);

      resp.json({
        ok: true,
        msg: 'Prestamo eliminado'
      });
    } catch (error) {
      resp.json({
        ok: true,
        msg: 'Error inesperado... revisar logs'
      });
    }
  }
}

module.exports = PrestamoController;
