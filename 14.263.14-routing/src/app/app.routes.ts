import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolverUsername, resolveTitle, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/user/user.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  return shouldGetAccess < 0.5
    ? true
    : new RedirectCommand(router.parseUrl("/unauthorized"));
}
export const routes: Routes = [
  { 
    path: "",
    component: NoTaskComponent,
    // redirectTo: "/users/u1",
    // pathMatch: "full",
    title: "No task selected"
  },
  { 
    path: "users/:userId", 
    component: UserTasksComponent,
    children: userRoutes,
    // canMatch: [dummyCanMatch],
    data: {
      message: "Hello!"
    },
    resolve: {
      userName: resolverUsername
    },
    title: resolveTitle
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];