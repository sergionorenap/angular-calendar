import { Component, Input, OnInit } from '@angular/core';
import { ReminderActionsEnum } from 'src/app/enums/reminder-actions.enum';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-mini-reminder',
  templateUrl: './mini-reminder.component.html',
  styleUrls: ['./mini-reminder.component.scss'],
})
export class MiniReminderComponent implements OnInit {
  @Input() reminder: Reminder;

  constructor(private reminderService: ReminderService) {}

  ngOnInit(): void {}

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
