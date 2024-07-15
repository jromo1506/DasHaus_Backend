const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const leadController = require('../controllers/leadController');
const inventarioController = require('../controllers/inventarioController');
const cotizacionController = require('../controllers/cotizacionController');
const mensualidadController = require('../controllers/mensualidadController');
const colindanciaController = require('../controllers/colindanciaController');


const reporteController = require('../controllers/reporteController');
const coordenadaController = require('../controllers/coordenadaController');
const mapaController = require('../controllers/mapaController');
const pronosticoController = require('../controllers/pronosticoController');
const imagenMapaController = require('../controllers/imagenMapaController');


const Mensualidad = require('../models/Mensualidad');
const Coordenada = require('../models/Coordenadas');


router.post('/addUser',userController.addUser);
router.get('/getUsers',userController.getUsers);
router.post('/authUser',userController.authUser);
router.post('/getUser',userController.getUserRegex);
router.post('/getUserById',userController.getUserById);
router.get('/getUsernameById/:id',leadController.getUsernameById);



router.delete('/deleteUser/:id',userController.deleteUser);
router.get('/getVendors',userController.getVendors);

router.post('/addLead',leadController.addLead);
router.get('/getVendorAcomulado',leadController.getVendorAcomulado);
router.post('/anvanzarLead',leadController.anvanzarLead);
router.post('/regresarLead',leadController.regresarLead);
router.get('/getLeads',leadController.getLeads);
router.get('/getLeadsVendorMes',leadController.getLeadsVendorMes);
router.get('/getCategoryLeads',leadController.getCategoryLeads);
router.post('/cambiarVendorLead',leadController.cambiarVendorLead);



router.get('/getLeadsApartados',leadController.getLeadsApartados);
router.get('/getLeadsProspectos',leadController.getLeadsProspectos);
router.get('/getLeadsLeads',leadController.getLeadsLeads);

//aaaa
router.get('/getLeadsEntregado',leadController.getLeadsEntregado);
router.get('/getLeadsFirmado',leadController.getLeadsFirmado);
router.get('/getLeadsContrato',leadController.getLeadsContrato);
router.get('/getLeadsCotizado',leadController.getLeadsCotizado);

router.get('/getLeadsNotarial',leadController.getLeadsNotarial);
router.get('/getLeadsListoNotarial',leadController.getLeadsListoNotarial);

router.get('/getApartadosConteo',leadController.getApartadosConteo);

router.get('/getLeadsGlobalConteo',leadController.getLeadsGlobalConteo);

router.get('/getApartadoPorCanal',leadController.getApartadoPorCanal);
router.get('/getApartadoPorprototipo',leadController.getApartadoPorprototipo);

router.get('/getHitrateApartado',leadController.getHitrateApartado);
router.get('/getLeadsMes',leadController.getLeadsMes);

router.post('/getLeadsByVendor',leadController.getLeadsByVendor);

router.post('/setApartado',leadController.setApartado);
router.post('/popApartado',leadController.popApartado);

router.get('/getLead/:id', leadController.getLeadById);


router.post('/addCotizacion',cotizacionController.addCotizacion);
router.post('/borrarCotizacionPorIdUsuario',cotizacionController.borrarCotizacionPorIdUsuario);
router.post('/getCotizacionPorIdCotizacion',cotizacionController.buscarCotizacionPorIdCotizacion);
router.post('/getCotizacionPorIdUsuario',cotizacionController.buscarCotizacionPorIdUsuario);



router.post('/addMensualidad',mensualidadController.addMensualidad);
router.post('/borrarPorIdCotizacion',mensualidadController.borrarPorIdCotizacion);
router.post('/getMensualidadesPorId',mensualidadController.buscarPorIdCotizacion);

//router.get('/',leadController.);


router.post('/addInventario',inventarioController.addInventario);
router.get('/getConteoStatus',inventarioController.getConteoStatus);
router.post('/updateInventario',inventarioController.updateInventario);
router.post('/borrarInv',inventarioController.borrarInv);
router.get('/getInventarios',inventarioController.getInventarios);
router.get('/getInventariosDisponibles',inventarioController.getInventariosDisponibles);
router.get('/getInventarioPorId/:id',inventarioController.getInventarioPorId);
router.put('/putColindancias',inventarioController.assignColindancias);
router.post('/postAssignCoordenada', inventarioController.assignCoordenada);
router.put('/putCambiarEstado/:id', inventarioController.cambiarEstado);


router.get('/getEtapasDesarrollo',inventarioController.getEtapasDesarrollo);
router.get('/getotalventas',inventarioController.getotalventas);



router.post('/addColindancia',colindanciaController.addColindancia);
router.get('/getColindanciasPorId/:id',colindanciaController.getColindanciasById);

router.post('/addCoordenada',coordenadaController.addCoordenada);
router.delete('/deleteCoordenada',coordenadaController.eliminarPorId);
router.get('/getCoordenadas/:id',coordenadaController.buscarCoordenadasPorIdMapa);
router.put('/putNombreLote/',coordenadaController.actualizarNombreLote);
router.put('/putIdInventario',coordenadaController.actualizarIdInventario);
router.put('/putEstadoLote/',coordenadaController.actualizarEstadoLote);
router.post('/postCoordenadaPorId',coordenadaController.buscarCoordenadaPorId);


router.post('/addMapa',mapaController.addMapa);
router.delete('/deleteMapa/:id',mapaController.eliminarPorId);
router.put('/putCoordenadas',mapaController.assignCoordenadas);
router.get('/getMapas',mapaController.getMapas);
router.get('/getMapaPorId/:id',mapaController.getMapaPorId);


router.post('/addReporte',reporteController.addReporte);
router.get('/getReporte',reporteController.getReportes);
router.get('/getReportesfin',reporteController.getReportesfin);
router.delete('/deleteReporte/:id',reporteController.deleteReporte);
router.get('/getReportesCategoria',reporteController.getReportesCategoria);
router.post('/setEstado',reporteController.setEstado);

router.post('/addPronosticos',pronosticoController.addPronostico);
router.post('/updatePronostico',pronosticoController.updatePronostico);
router.get('/getPronostico',pronosticoController.getPronosticos);

// URL MAPA CONTROLLER

router.post('/addUrlMapa',imagenMapaController.addMapa);
router.get('/getUrlMapas',imagenMapaController.getMapas);




module.exports = router;


