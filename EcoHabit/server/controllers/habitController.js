const Habit = require('../models/Habit');

const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habits' });
  }
};

const getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch habit' });
  }
};

const createHabit = async (req, res) => {
  try {
    const { name, description, frequency } = req.body;
    const newHabit = new Habit({ name, description, frequency, userId: req.userId });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create habit' });
  }
};

const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    Object.assign(habit, req.body);
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update habit' });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit || habit.userId.toString() !== req.userId) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    await habit.remove();
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete habit' });
  }
};

module.exports = { getHabits, getHabitById, createHabit, updateHabit, deleteHabit };
