import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AboutPageComponent } from "./about-page/about-page.component";
import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { MemberPageComponent } from "./member-page/member-page.component";
import { ProfilPageComponent } from "./profil-page/profil-page.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { TransaksiPageComponent } from "./transaksi-page/transaksi-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginPageComponent },
  { path: "dashboard", component: DashboardPageComponent },
  { path: "registration", component: RegistrationPageComponent },
  { path: "profil", component: ProfilPageComponent },
  { path: "about", component: AboutPageComponent },
  { path: "member", component: MemberPageComponent },
  { path: "admin", component: AdminPageComponent },
  { path: "transaksi", component: TransaksiPageComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
