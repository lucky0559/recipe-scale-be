import { Food } from "../models/food.model.js";

export const getFoods = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i"
      };
    }

    if (category && category !== "all") {
      filter.categories = {
        $in: [category]
      };
    }

    const foods = await Food.find(filter);

    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
};

export const getFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

export const createFood = async (req, res, next) => {
  try {
    const food = await Food.create(req.body);
    res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};

export const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updated = await Food.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Food.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
