const router = require('express').Router();
const ctrl = require('../controllers/schedule.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, ctrl.createSchedule);
router.get('/', auth, ctrl.getSchedules);
router.delete('/:id', auth, ctrl.deleteSchedule);
// To-do list
router.post('/task', auth, ctrl.addTask);
router.put('/task/complete', auth, ctrl.completeTask);

module.exports = router;