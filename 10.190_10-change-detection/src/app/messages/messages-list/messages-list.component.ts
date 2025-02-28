import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MessagesService } from '../../message.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesListComponent {
  private _messages = inject(MessagesService);
  messages = this._messages.allMessages;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
