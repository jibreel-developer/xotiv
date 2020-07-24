/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const BaseRepository = require("../../../db/baseRepository");

class ContactsRepository extends BaseRepository {
  constructor() {
    super("contacts");
  }
}

module.exports = ContactsRepository;
