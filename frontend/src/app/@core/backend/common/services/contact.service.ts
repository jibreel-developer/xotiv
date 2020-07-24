/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactApi } from '../api/contacts.api';
import { ContactData, Contact } from "../../../interfaces/common/contact";
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class ContactService extends ContactData {

  constructor(private api: ContactApi, private authService: NbAuthService) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.usersDataSource;
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<{items:Contact[], totalCount: number}> {
    return this.api.list(pageNumber, pageSize);
  }

  get(id: number): Observable<Contact> {
    return this.api.get(id);
  }

  create(contact: any): Observable<Contact> {
    return this.api.add(contact);
  }

  update(contact: any): Observable<Contact> {
    return this.api.update(contact);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
