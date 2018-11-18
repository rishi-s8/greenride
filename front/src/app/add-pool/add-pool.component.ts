import { Component, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { Ride } from '../rides';
import { NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-add-pool',
  templateUrl: './add-pool.component.html',
  styleUrls: ['./add-pool.component.css'],
  providers: [RidesService]
})

export class AddPoolComponent implements OnInit {
  rides: Ride[] = [];
  ride: Ride;
  user: string;
  totalSeats: number;
  availableSeats: number;
  time: string;
  src: string;
  dest: string;
  paid: boolean;
  amount: number;

  constructor(private ridesService: RidesService) { }

  addRide()
  {
    if (this.paid == undefined)
      this.paid = false;
    const newRide = {
      user: "1",
      totalSeats: this.totalSeats,
      availableSeats: this.totalSeats,
      time: this.time,
      src: this.src,
      dest: this.dest,
      paid: this.paid,
      amount: this.amount
    }
    this.ridesService.addRide(newRide)
    .subscribe(ride => {
      this.rides.push(this.ride);
    });
  }

  deleteRide(id: any)
  {
    var rides = this.rides;
    this.ridesService.deleteRide(id)
    .subscribe(data => {
      if (data.n == 1)
      {
        for (var i=0;i<rides.length;++i)
        {
          if (rides[i]._id == id)
          {
            rides.splice(i,i);
          }
        }
      }
    })
  }

  ngOnInit() {
    this.ridesService.getRides()
    .subscribe( rides =>
      this.ride = rides);
  }
}
