import { Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { userRoutes } from "./users/user/user.routes";

export const routes: Routes = [
  { 
    path: "",
    // component: NoTaskComponent,
    redirectTo: "/users/u1",
    pathMatch: "full",
  },
  { 
    path: "users/:userId", 
    component: UserTasksComponent,
    children: userRoutes
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];