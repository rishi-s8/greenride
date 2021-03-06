export class Ride {
    _id: string;
    user: string;
    totalSeats: number;
    availableSeats: number;
    time: string;
    src: string;
    dest: string;
    paid: boolean;
    amount: number;
}

export class Pool {
    _id: string;
    user: string;
    ride: string;
    bookedSeats: number;
}