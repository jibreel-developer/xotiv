/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from "@angular/core";
import { ChartsModule } from "ng2-charts";

import { DashboardComponent } from "./dashboard.component";

@NgModule({
  imports: [ChartsModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
