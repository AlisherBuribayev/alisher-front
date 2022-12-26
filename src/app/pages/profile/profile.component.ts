import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { HttpClient } from '@angular/common/http';
import { UserActionsService } from 'src/app/services/user-actions/user-actions.service';

interface ISubscriptionItem {
  name: string;
}
interface IProfile {
  userInfo: {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    country: string;
  };
  userSubs: ISubscriptionItem[];
}
interface IProfileDTO {
  data: IProfile;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent extends UserActionsService implements OnInit {
  profile: IProfile = {
    userInfo: {
      id: -1,
      name: 'loading',
      surname: 'loading',
      email: 'loading',
      phone: 'loading',
      country: 'loading',
    },
    userSubs: [
      {
        name: 'loading',
      },
    ],
  };

  constructor(router: Router, _toastService: ToastService, http: HttpClient) {
    super(router, _toastService, http);
  }

  async ngOnInit() {
    const promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<IProfileDTO>(`https://book-share.abmco.kz/api/v1/profile`, {
          headers: this.getAuthToken(),
        })
        .subscribe({
          next: (response: IProfileDTO) => {
            this.profile = response.data as IProfile;

            resolve();
          },
          error: (err: any) => {
            reject(err);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    await promise;
  }
}
