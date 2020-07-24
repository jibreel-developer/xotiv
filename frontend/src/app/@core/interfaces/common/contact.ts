/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Observable } from "rxjs";
import { DataSource } from "ng2-smart-table/lib/lib/data-source/data-source";

export interface Contact {
  id: string;
  fullName: string;
  title: string;
  organization: string;
  email: string;
  phoneNumber: string;
  facebookId: string;
  twitterId: string;
}

export abstract class ContactData {
  abstract get gridDataSource(): DataSource;
  abstract list(
    pageNumber: number,
    pageSize: number
  ): Observable<{ items: Contact[]; totalCount: number }>;
  abstract get(id: number): Observable<Contact>;
  abstract update(user: Contact): Observable<Contact>;
  abstract create(user: Contact): Observable<Contact>;
  abstract delete(id: number): Observable<boolean>;
}
