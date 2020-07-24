/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// import { NbToastrService } from "@nebular/theme";
// import { NbTokenService } from "@nebular/auth";
import { ContactData } from "../../../@core/interfaces/common/contact";

@Component({
  selector: "ngx-user",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  allColumns = [
    { key: "fullName", label: "Full name" },
    { key: "title", label: "Title" },
    { key: "organization", label: "Organization" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone number" },
    { key: "facebookId", label: "Facebook Id" },
  ];
  columnsToShow = [
    ...this.allColumns.map((i) => i.key),
    'actions'
  ];
  contactsDataSource = [];

  constructor(private contactsService: ContactData, private router: Router) {}

  ngOnInit(): void {
    this.loadContactsData();
  }

  loadContactsData() {
    this.contactsService.list(1, 10000).subscribe((response) => {
      this.contactsDataSource = response.items.map((i) => ({ data: i }));
    });
  }

  back() {
    this.router.navigate([".."]);
  }

  ngOnDestroy(): void {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }
}
