import express from 'express';
import { requireAuthentication } from '../middlewares/requireAuthentication';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send({ currentUser: req.currentUser ?? null });
});

export { router as currentUserRouter };
