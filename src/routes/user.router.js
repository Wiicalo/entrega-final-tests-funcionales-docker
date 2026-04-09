import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { autheticatedToken } from "../middleware/user.middleware.js";

const router = new Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Lista todos los usuarios
 *     tags: [users]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: "1"
 *                 name: "Alejandro"
 *                 email: "alejandro@email.com"
 *       '500':
 *         description: Error servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Error interno"
 */
router.get('/', UserController.getAllUsers);
/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Crear usuario
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: 'string', example: 'Ana López' }
 *               email: { type: 'string', example: 'ana@example.com' }
 *               password: { type: 'string', example: '123' }
 *     responses:
 *       '201':
 *         description: Creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "3"
 *               name: "Ana López"
 *               email: "ana@example.com"
 *       '400':
 *         description: Error validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', UserController.validateCreate, UserController.create);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     tags: [users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: 'string', example: 'juan@example.com' }
 *               password: { type: 'string', example: '123' }
 *     responses:
 *       '200':
 *         description: Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               token: "jwt.example"
 *               user:
 *                 id: "1"
 *                 name: "Juan Pérez"
 *                 email: "juan@example.com"
 *       '401':
 *         description: Invalid creds
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Perfil autenticado
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Perfil
 *         content:
 *           application/json:
 *             schema:
 * 
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/profile', autheticatedToken, UserController.profileUser);

export default router;