import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../../services/user-services/user.service';
import { IUser } from '../../models/iuser';
import { error, log } from 'console';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User implements OnInit {
  users: IUser[] = [];
  loading = true;
  error: string | null = null;

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data.users;
        console.log(this.users);
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load users.';
        this.loading = false;
      },
    });
  }
deleteUser(userId: string) {
  this.UserService.deleteUserByAdmin(userId).subscribe({
    next: () => {
      this.users = this.users.filter((user) => user._id !== userId);
    },
    error: (err) => {
      this.error = err?.error?.message || 'Failed to delete user';
    },
  });
}
// updateUser(userId: string){
//   this.UserService.updateUserByAdmin(userId, ).subscribe({
//     next: (updateUser) =>{
//       this.users = this.users.map((user) => 
//         user._id === userId ? updateUser : user
//       )
//     },
//     error: (err) => {
//       this.error = err?.error?.message || 'Failed to Update user';
//     },
//   })
// }
}
