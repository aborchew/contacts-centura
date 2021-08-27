const express = require("express");
const router = express.Router();
const contacts = require("../data/contacts");
const isUUID = require("is-uuid");

/* GET contacts listing. */
router.get("/", (req, res, next) => res.json(contacts));

/* GET contacts listing. */
router.get("/:contact_id", (req, res, next) => {
  const {
    params: { contact_id },
  } = req;

  if (!contact_id || !isUUID.v4(contact_id)) {
    return res.status(400).json({
      error: "Malformed Request",
    });
  }

  const match = contacts.find(
    ({ contact_id: candidateContactId }) => candidateContactId === contact_id
  );

  if (!match) {
    return res.status(404).json({
      error: `No contact found with contact_id ${contact_id}`,
    });
  }

  res.json(match);
});

module.exports = router;
