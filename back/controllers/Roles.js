// controllers/RoleController.js
const Role = require("../models/Role.js");

async function seedRoles() {
  try {
    const existingRoles = await Role.find();
    if (existingRoles.length === 0) {
      const rolesData = [
        { name: "admin", number: 0 },
        { name: "magasinier", number: 1 },
        { name: "commercial", number: 2 },
        { name: "franchis", number: 3 },
        { name: "Sous-franchis", number: 4 },
        { name: "Point de vente", number: 5 },
        // Add other roles as needed
      ];
      await Role.insertMany(rolesData);
      console.log("Roles seeded successfully.");
    } else {
      console.log("Roles already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
}

module.exports = {
  seedRoles,
};
