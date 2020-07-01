import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent implements OnInit {
  count = [1, 2, 3, 4, 5 , 6]

  constructor() { }

  ngOnInit() {
  }

}
