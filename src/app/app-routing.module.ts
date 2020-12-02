import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";

import { LoginPageComponent } from "./login-page/login-page.component";

// import { AdminPageComponent } from "./admin-page/admin-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "register", component: RegistrationPageComponent }
  // { path: "admin", component: AdminPageComponent },
  // { path: "admin/:adminCommand", component: AdminPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
