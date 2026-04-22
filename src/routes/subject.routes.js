const router = require('express').Router();
const ctrl = require('../controllers/subject.controller');
const auth = require('../middleware/auth.middleware');
router.post('/material', auth, ctrl.addMaterial);
router.post('/', auth, ctrl.createSubject);
router.get('/', ctrl.getSubjects);
router.get('/search', ctrl.searchSubjects);

module.exports = router;