/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators";

import { NbToastrService } from "@nebular/theme";

import { EMAIL_PATTERN, NUMBERS_PATTERN } from "../../../@auth/components";
import { ContactData, Contact } from "../../../@core/interfaces/common/contact";

export enum ContactFormMode {
  VIEW = "View",
  EDIT = "Edit",
  ADD = "Add",
}

@Component({
  selector: "ngx-user",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;

  protected readonly unsubscribe$ = new Subject<void>();

  get email() { return this.contactForm.get('email') }

  get phoneNumber() { return this.contactForm.get('phoneNumber') }

  mode: ContactFormMode;
  setViewMode(viewMode: ContactFormMode) {
    this.mode = viewMode;
  }

  constructor(
    private contactsService: ContactData,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.loadContactData();
  }

  initUserForm() {
    this.contactForm = this.fb.group({
      id: this.fb.control(""),
      fullName: this.fb.control(""),
      title: this.fb.control(""),
      organization: this.fb.control(""),
      email: this.fb.control("", [Validators.pattern(EMAIL_PATTERN)]),
      phoneNumber: this.fb.control("", [Validators.pattern(NUMBERS_PATTERN)]),
      facebookId: this.fb.control(""),
      twitterId: this.fb.control(""),
    });
  }

  get canEdit(): boolean {
    return this.mode !== ContactFormMode.VIEW;
  }

  loadContactData() {
    const id: any = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.setViewMode(ContactFormMode.EDIT);
      this.loadContact(id);
    } else {
      this.setViewMode(ContactFormMode.ADD);
    }
  }

  loadContact(id?) {
    const loadContact = this.contactsService.get(id);
    loadContact.subscribe((contact) => {
      console.log(contact);
      
      this.contactForm.setValue({
        id: contact.id || "",
        fullName: contact.fullName || "",
        title: contact.title || "",
        organization: contact.organization || "",
        email: contact.email || "",
        phoneNumber: contact.phoneNumber || "",
        facebookId: contact.facebookId || "",
        twitterId: contact.twitterId || "",
      });
    });
  }

  convertToContact(value: any): Contact {
    const contact: Contact = value;
    return contact;
  }

  save() {
    const contact: Contact = this.convertToContact(this.contactForm.value);

    let observable = new Observable<Contact>();
    observable = contact.id
      ? this.contactsService.update(contact)
      : this.contactsService.create(contact);

    observable.pipe(takeUntil(this.unsubscribe$)).subscribe(
      () => {
        this.handleSuccessResponse();
      },
      (err) => {
        this.handleWrongResponse();
      }
    );
  }

  handleSuccessResponse() {
    this.toasterService.success(
      "",
      `Item ${this.mode === ContactFormMode.ADD ? "created" : "updated"}!`
    );
    this.back();
  }

  handleWrongResponse() {
    this.toasterService.danger("", `Somthing went wrong!`);
  }

  back() {
    this.router.navigate(["/pages/contacts/list"]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
