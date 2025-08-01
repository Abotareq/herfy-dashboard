import { Component, inject, OnInit } from '@angular/core';
import {CommonModule, NgIf } from '@angular/common';
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
  userProps: IUser = {} as IUser;
  editingUserId: String | null = null
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.data.users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load users.';
        this.loading = false;
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
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      },
    });
  }
  // start edit function to make the body ready
  startEdit(user: IUser){
    this.editingUserId = user._id;
    this.userProps = {...user};
  }
  // cancel edit
  cancelEdit(){
    this.editingUserId = null;
    this.userProps = {} as IUser;
  }

  updateUser(users: IUser){
    if(!users._id){
      alert ("Cann't Update User")
    }
    this.userService.updateUserByAdmin(users._id, users).subscribe({
      next: (updateUser) => {
        const index = this.users.findIndex(user => user._id === updateUser._id);
        if(index !== -1){
          this.users[index] = updateUser;  
        }
        this.cancelEdit();
      },
     error: (error) => {
      console.log("Error", error);
     }
    })
  }
}
