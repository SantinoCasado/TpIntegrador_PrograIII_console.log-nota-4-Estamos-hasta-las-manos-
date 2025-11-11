const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

// GET /admin/login => muestra la pagina de login admin
router.get('/login', adminController.showAdimnLoginPage);

// POST /admin/login => procesa el login admin
router.post('/login', adminController.processAdminLogin);

// GET /admin/logout => procesa el logout admin
router.get('/logout', adminController.processAdminLogout);

// Redireccion /admin a /admin/login
router.get('/', (req, res) => {
  res.redirect('/admin/login');
});

module.exports = router;