import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId    = input.required<string>();
  // userName  = computed(() => this.userService.users.find(u => u.id === this.userId())?.name)
  private userService = inject(UsersService);
  private activeRoute = inject(ActivatedRoute);
  private destroy     = inject(DestroyRef);

  userName = "";
  ngOnInit(): void {
    console.log(this.activeRoute);
    const sub = this.activeRoute.paramMap.subscribe({
      next: paramMap => {
        this.userName = this.userService.users.find(u => u.id === paramMap.get("userId"))?.name ?? "";
      }
    });

    this.destroy.onDestroy(() => sub.unsubscribe());
  }

}
