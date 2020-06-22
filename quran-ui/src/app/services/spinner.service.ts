import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
    public spinnerCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    displaySpinner(value: boolean) {
      let counter = value ? this.spinnerCounter.value + 1 : this.spinnerCounter.value - 1;
      this.spinnerCounter.next(counter);
    }
}