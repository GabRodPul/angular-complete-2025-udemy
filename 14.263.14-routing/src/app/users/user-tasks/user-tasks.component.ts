import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  message  = input.required<string>();
  // private activeRoute = inject(ActivatedRoute);
  // private destroy     = inject(DestroyRef);

  // ngOnInit(): void {
  //   console.log(this.activeRoute.snapshot);
  //   const sub = this.activeRoute.data.subscribe({
  //     next: data => {
  //       console.log(data);
  //     }
  //   });

  //   this.destroy.onDestroy(() => sub.unsubscribe());
  // }
}

export const resolverUsername: ResolveFn<string> = (
  activeRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  return usersService.users
    .find(u => u.id === activeRoute.paramMap.get("userId"))?.name ?? "";
}

export const resolveTitle :ResolveFn<string> = (
  activeRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => resolverUsername(activeRoute, routerState) + "'s Tasks"