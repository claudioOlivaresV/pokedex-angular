import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {
  private message = new BehaviorSubject<any>({region: 'kanto', limit : 151, offset: 0});

  public customMessage = this.message.asObservable();

  constructor() { }
  public changeMessage(msg: any): void {
    this.message.next(msg);
  }
}
