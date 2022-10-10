import { Routes } from "@angular/router";
import { DetailsComponent } from "../finance/details/details.component";
import { FinanceComponent } from "../finance/finance.component";
import { StatisticsComponent } from "../finance/statistics/statistics.component";

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-expenses', component: FinanceComponent },
  { path: 'details', component: DetailsComponent },
];
