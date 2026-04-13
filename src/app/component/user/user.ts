import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user-services/user.service';
import { IUser } from '../../models/iuser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {
  users: IUser[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef // ✅ Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data.users;
        this.loading = false;
        this.cd.detectChanges(); // ✅ Trigger change detection manually
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load users.';
        this.loading = false;
        this.cd.detectChanges(); // ✅ Trigger change detection manually
      },
    });
  }

  deleteUser(id: string) {
    if (!id) {
      console.error('User ID is undefined');
      return;
    }
    this.userService.deleteUserByAdmin(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user._id !== id);
        console.log('User deleted:', id);
        this.cd.detectChanges(); // ✅ Trigger change detection manually
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.cd.detectChanges(); // optional, if UI reacts to error state
      },
    });
  }
}
