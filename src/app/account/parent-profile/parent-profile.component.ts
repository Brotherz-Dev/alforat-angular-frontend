import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ResponseUserDto } from 'src/app/shared/user-dto/user-response';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss']
})
export class ParentProfileComponent implements OnInit {

  user: ResponseUserDto | undefined;

  


  constructor(private userService: UserService  ) {
    this.userService.getProfile().subscribe(async (res) => {
      console.log(res);
      this.user = res;
    });
  }

  ngOnInit() { }


}
