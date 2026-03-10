import express from "express";
const router = express.Router();

const recipes = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1761637604972-070dee14cd32?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Burnt Basque Cheesecake",
    description:
      "A rich and creamy cheesecake with a perfectly caramelized top and a velvety smooth center, offering a slightly burnt flavor that makes it irresistibly unique.",
    ingredients: [
      {
        name: "Butter",
        needed: 1,
        unit: "tablespoon"
      },
      {
        name: "Cream Cheese",
        needed: 1,
        unit: "bar"
      },
      {
        name: "Sugar",
        needed: 6,
        unit: "tablespoon"
      },
      {
        name: "Egg",
        needed: 2,
        unit: "pieces"
      },
      {
        name: "All Purpose Cream",
        needed: 1,
        unit: "packet"
      },
      {
        name: "Salt",
        needed: 0.25,
        unit: "teaspoons"
      },
      {
        name: "Vanilla Extract",
        needed: 0.5,
        unit: "teaspoons"
      },
      {
        name: "All Purpose Flour",
        needed: 0.5,
        unit: "tablespoons"
      }
    ],
    categories: ["dessert"]
  },
  {
    id: 2,
    imageUrl:
      "https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/b851750ea117918778b2949c7de9df27.jpg.webp?itok=a2qGRlzi",
    name: "Adobo Fried Rice",
    description:
      "Adobo fried rice is a flavorful and savory recipe featuring the classic Filipino adobo flavors, often mixed with shredded adobo meat and other aromatic ingredients. This recipe showcases the Filipinos' love for transforming traditional dishes into creative and satisfying fried rice variations.",
    ingredients: [
      {
        name: "Pork Shoulder",
        needed: 0.5,
        unit: "kilograms"
      },
      {
        name: "Garlic (Crushed)",
        needed: 1,
        unit: "head"
      },
      {
        name: "Black Peppercorn",
        needed: 1,
        unit: "teaspoon"
      },
      {
        name: "Vinegar",
        needed: 3,
        unit: "tablespoons"
      },
      {
        name: "30g Maggi Oyster Sauce",
        needed: 1,
        unit: "sachet"
      },
      {
        name: "8g Maggi Magic Sarap",
        needed: 1,
        unit: "sachet"
      },
      {
        name: "Water",
        needed: 1,
        unit: "cup"
      },
      {
        name: "Vegetable Oil",
        needed: 3,
        unit: "tablespoons"
      },
      {
        name: "Day Old Rice",
        needed: 4,
        unit: "cups"
      },
      {
        name: "Toasted Garlic",
        needed: 1,
        unit: "tablespoons"
      },
      {
        name: "Sliced Spring Onion",
        needed: 1,
        unit: "tablespoons"
      }
    ],
    categories: ["breakfast", "entrant"]
  },
  {
    id: 3,
    imageUrl:
      "https://www.nestlegoodnes.com/ph/sites/default/files/styles/1_1_768px_width/public/srh_recipes/6effa4d0067f9e24613a97949eae31bd.png.webp?itok=FyCYe9AO",
    name: "Adobong Pinyanhang Manok",
    description:
      "Adobong Pininyahang Manok is a delightful Filipino dish that combines the classic flavors of adobo with the sweetness of pineapple. This unique fusion creates a mouthwatering and unforgettable culinary experience. The star of this recipe is the succulent chicken, marinated and cooked in a flavorful blend of soy sauce, vinegar, garlic, and spices.",
    ingredients: [
      {
        name: "Chicken Leg and Wings",
        needed: 1,
        unit: "kilogram"
      },
      {
        name: "10g Maggi Chicken Cube",
        needed: 1,
        unit: "piece"
      },
      {
        name: "300ml Maggi Oyster Sauce",
        needed: 0.25,
        unit: "cups"
      },
      {
        name: "Vinegar",
        needed: 0.5,
        unit: "cups"
      },
      {
        name: "Bay Leaf",
        needed: 2,
        unit: "pieces"
      },
      {
        name: "Ground Pepper",
        needed: 0.5,
        unit: "teaspoons"
      },
      {
        name: "Garlic (lightly crushed)",
        needed: 1,
        unit: "head"
      },
      {
        name: "Pineapple Chunks",
        needed: 1,
        unit: "can"
      },
      {
        name: "Brown Sugar",
        needed: 1,
        unit: "tablespoon"
      },
      {
        name: "Waater",
        needed: 0.5,
        unit: "cups"
      },
      {
        name: "Vegetable Oil",
        needed: 2,
        unit: "tablespoons"
      }
    ],
    categories: ["dinner", "lunch", "entrant"]
  }
];

router.get("/", (req, res, next) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(recipes.slice(0, limit));
  } else {
    res.status(200).json(recipes);
  }
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    const error = new Error(`Recipe with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(recipe);
});

router.post("/", (req, res, next) => {
  const recipe = req.body;

  res.status(201).json(recipe);
});

router.put("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  const r = recipes.find(r => r.id === id);

  if (!r) {
    const error = new Error(`Recipe with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  r.id = req.body.id;

  res.status(200).json(r);
});

router.delete("/:id", (req, res, next) => {
  const id = parseInt(req.params.id);

  const rFind = recipes.find(r => r.id === id);

  if (!rFind) {
    const error = new Error(`Recipe with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  const r = recipes.filter(r => r.id !== id);

  res.status(200).json(r);
});

export default router;
