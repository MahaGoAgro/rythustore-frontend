const express = require("express");
const validator = require("validator");
const prisma = require("../config/db");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// ── GET /api/addresses ─────────────────────────
router.get("/", async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user.id }
    });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /api/addresses ────────────────────────
router.post("/", async (req, res) => {
  try {
    const label   = validator.escape(req.body.label?.trim()   || "");
    const line1   = validator.escape(req.body.line1?.trim()   || "");
    const city    = validator.escape(req.body.city?.trim()    || "");
    const state   = validator.escape(req.body.state?.trim()   || "");
    const pincode = validator.escape(req.body.pincode?.trim() || "");

    if (!label || !line1 || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: "Please fill all fields!" });
    }

    const address = await prisma.address.create({
      data: { userId: req.user.id, label, line1, city, state, pincode }
    });

    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/addresses/:id ──────────────────
router.delete("/:id", async (req, res) => {
  try {
    const address = await prisma.address.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found!" });
    }

    await prisma.address.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: "Address deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
