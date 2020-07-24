/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

const ContactsRepository = require("./contactRepository");

class ContactsService {
  constructor() {
    this.repository = new ContactsRepository();
  }

  getCount() {
    return this.repository.getCount();
  }

  findById(id) {
    return this.repository.findById(id)
      .then(contact => this.mapContactToDto(contact));
  }

  addContact(contact) {
    return this.repository.add(contact);
  }

  addMany(contacts) {
    return this.repository.addMany(contacts);
  }

  editContact(dto, contactId) {
    const contact = this.mapDtoToContact(dto);

    return this.repository.edit(contactId, contact)
      .then(() => this.findById(contactId))
      .catch(error => {
        throw error;
      });
  }


  deleteContact(id) {
    return this.repository.delete(id);
  }

  list(filter) {
    return Promise.all([
      this.repository.listFiltered(filter),
      this.repository.getCountFiltered(filter),
    ])
      .then(([data, count]) => {
        return {
          items: data.map(item => this.mapContactToDto(item)),
          totalCount: count,
        };
      });
  }

  mapContactToDto(contact) {
    return contact ? {
      id: contact._id,
      fullName: contact.fullName,
      title: contact.title,
      organization: contact.organization,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      facebookId: contact.facebookId,
      twitterId: contact.twitterId,
    } : {};
  }

  mapDtoToContact(dto) {
    return dto ? {
      fullName: dto.fullName,
      title: dto.title,
      organization: dto.organization,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      facbookId: dto.facbookId,
      twitterId: dto.twitterId,
    } : {};
  }
}

module.exports = ContactsService;
