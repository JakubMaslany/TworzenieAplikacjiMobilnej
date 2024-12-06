const express = require('express');
const {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
} = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getHabits);
router.get('/:id', getHabitById);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);

module.exports = router;
