import { Component, OnInit } from '@angular/core';
import { RidesService } from '../rides.service';
import { Ride, Pool } from '../rides';
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
  currUser: any;
  totalSeats: number;
  availableSeats: number;
  time: string;
  src: string;
  dest: string;
  paid: boolean;
  amount: number;
  pool: Pool;
  pride: string;
  bookedSeats: string;

  constructor(private ridesService: RidesService) { }

  addRide()
  {
    if (this.paid == undefined)
      this.paid = false;
    const newRide = {
      user: this.currUser.user,
      totalSeats: this.totalSeats,
      availableSeats: this.totalSeats,
      time: this.time,
      src: this.src,
      dest: this.dest,
      paid: this.paid,
      amount: this.amount
    }
    this.ridesService.addRide(newRide)
    .subscribe((ride:Ride) => {
      this.rides.push(ride);
    });
  }

  deleteRide(id: any)
  {
    var rides = this.rides;
    this.ridesService.deleteRide(id)
    .subscribe((data:any) => {
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

  addPool()
  {
    const newPool = {
      user: this.currUser.user,
      pool: this.pride,
      bookedSeats: this.bookedSeats
    }
    this.ridesService.addPool(newPool)
    .subscribe(pool => {
    });
  }

  ngOnInit() {
    this.ridesService.currUser()
    .subscribe( (currUser: any) =>
      this.currUser = currUser);

    this.ridesService.getRides()
    .subscribe( (rides:Ride[]) =>
      this.rides = rides);
  }
}
