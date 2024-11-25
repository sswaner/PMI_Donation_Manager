const Dropdown = require("../models/Dropdown");

exports.getDropdownItems = async (req, res) => {
  try {
    const { listName } = req.params;
    const items = await Dropdown.findAll({
      where: { ListName: listName },
      order: [["Sort_Order", "ASC"]],
    });
    if (items.length === 0) {
      return res.status(404).json({ message: "No items found for this list" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dropdown items" });
  }
};

exports.addDropdownItem = async (req, res) => {
  try {
    const { ListName, Label, Sort_Order } = req.body;
    const newItem = await Dropdown.create({ ListName, Label, Sort_Order });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add dropdown item" });
  }
};

exports.updateDropdownItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { ListName, Label, Sort_Order } = req.body;

    const item = await Dropdown.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.ListName = ListName;
    item.Label = Label;
    item.Sort_Order = Sort_Order;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Failed to update dropdown item" });
  }
};

exports.deleteDropdownItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Dropdown.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete dropdown item" });
  }
};