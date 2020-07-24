/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { AuthModule } from '../../@auth/auth.module';

// components
import { ContactsComponent } from './contacts.component';
import { ListComponent } from "./list/list.component";
import { ContactComponent } from './contact/contact.component';
import { ComponentsModule } from '../../@components/components.module';
// components

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
} from '@nebular/theme';

const  NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    Ng2SmartTableModule,
    ContactsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
  ],
  declarations: [
    ListComponent,
    ContactsComponent,
    ContactComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class ContactsModule { }
