import { param, validationResult } from 'express-validator';
import { AdoptionService } from '../services/adoption.service.js';

const adoptionService = new AdoptionService();
const idRule = /^[a-zA-Z0-9_-]{3,}$/;

function validationErrorResponse(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return false;
    res.status(400).json({ status: 'error', errors: errors.array() });
    return true;
}

function errorResponse(res, error) {
    const status = error.statusCode || 500;
    const payload = status === 500
        ? { status: 'error', error: 'Internal server error', detail: error.message }
        : { status: 'error', error: error.message };

    return res.status(status).json(payload);
}

export class AdoptionsController {
    static validateAdoptionId = [
        param('aid').matches(idRule).withMessage('Invalid adoption id')
    ];

    static validateCreate = [
        param('uid').matches(idRule).withMessage('Invalid user id'),
        param('pid').matches(idRule).withMessage('Invalid pet id')
    ];

    static getAllAdoptions(req, res) {
        try {
            const adoptions = adoptionService.getAllAdoptions();
            res.status(200).json({ status: 'success', payload: adoptions });
        } catch (error) {
            errorResponse(res, error);
        }
    }

    static getAdoption(req, res) {
        if (validationErrorResponse(req, res)) return;

        try {
            const adoption = adoptionService.getAdoptionById(req.params.aid);
            if (!adoption) {
                return res.status(404).json({ status: 'error', error: 'Adoption not found' });
            }

            return res.status(200).json({ status: 'success', payload: adoption });
        } catch (error) {
            return errorResponse(res, error);
        }
    }

    static createAdoption(req, res) {
        if (validationErrorResponse(req, res)) return;

        try {
            const adoption = adoptionService.createAdoption(req.params);
            return res.status(200).json({
                status: 'success',
                message: 'Pet adopted',
                payload: adoption
            });
        } catch (error) {
            return errorResponse(res, error);
        }
    }
}
