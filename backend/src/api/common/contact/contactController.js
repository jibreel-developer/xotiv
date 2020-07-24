/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const express = require("express");

const router = express.Router();

const ContactService = require("./contactService");

const contactService = new ContactService();

router.get('/', (req, res) => {
  contactService
    .list(req.query)
    .then(contacts => res.send(contacts));
});

router.post('/', (req, res) => {
  contactService
    .addContact(req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(400).send({ error: err.message }));
});

router.get('/:id', (req, res) => {
  contactService
    .findById(req.params.id)
    .then(contact => res.send(contact));
});

router.put('/:id', (req, res) => {
  contactService
    .editContact(req.body, req.params.id)
    .then(contact => res.send(contact))
    .catch(error => {
      if (error instanceof CustomErrorService) {
        res.status(error.metadata && error.metadata.error.code)
          .send(error);
      }
    });
});

router.delete('/:id', (req, res) => {
  contactService
    .deleteContact(req.params.id)
    .then(() => res.send({ id: req.params.id }));
});

module.exports = router;
