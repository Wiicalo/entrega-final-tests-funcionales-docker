import { Router } from 'express';
import { AdoptionsController } from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Lista todas las adopciones
 *     tags: [adoptions]
 */
router.get('/', AdoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtiene una adopcion por id
 *     tags: [adoptions]
 */
router.get('/:aid', AdoptionsController.validateAdoptionId, AdoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crea una adopcion entre usuario y mascota
 *     tags: [adoptions]
 */
router.post('/:uid/:pid', AdoptionsController.validateCreate, AdoptionsController.createAdoption);

export default router;
