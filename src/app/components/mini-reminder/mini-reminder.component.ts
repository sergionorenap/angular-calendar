import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Reminder } from '../../core/models/reminder';
import { ReminderService } from '../../services/reminder.service';
import { ReminderActionsEnum } from '../../core/enums/reminder-actions.enum';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mini-reminder',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './mini-reminder.component.html',
  styleUrl: './mini-reminder.component.scss',
})
export class MiniReminderComponent {
  @Input() reminder: Reminder = {} as Reminder;

  constructor(private reminderService: ReminderService) {}

  openReminderDetails(e: any): void {
    e.stopPropagation();
    this.reminderService.castAction(
      this.reminder,
      ReminderActionsEnum.OPEN_DETAILS
    );
  }

  deleteReminder(e: any): void {
    e.stopPropagation();
    this.reminderService.castAction(this.reminder, ReminderActionsEnum.DELETE);
  }
}
