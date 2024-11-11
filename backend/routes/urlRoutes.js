import express from 'express';
import { shortenUrl, redirectToOriginalUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/api/shorten', shortenUrl);

router.get('/:shortID', redirectToOriginalUrl);

export default router;
