const express = require("express");
const router = express.Router();
const dropdownController = require("../controllers/dropdownController");

// Define routes
router.get("/:listName", dropdownController.getDropdownItems);    // Get items for a specific list
router.post("/", dropdownController.addDropdownItem);             // Add a new dropdown item
router.put("/:id", dropdownController.updateDropdownItem);        // Update an existing item
router.delete("/:id", dropdownController.deleteDropdownItem);     // Delete an item

module.exports = router;