import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  arthimeticOperations = ["addition", "subtraction", "multiplication", "division"]
  error = "";

  result: number | null = null;

  initialNumbers: Array<number> = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5).slice(0, 5);



  number1: Array<number> = [];
  number2: Array<number> = [];
  operationSelected = "addition"

  drop(event: CdkDragDrop<number[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  calculate() {
    if(!this.operationSelected) {
      this.error = "Please select an operation"
      return
    }

    const sumOfNumbers1 = this.number1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const sumOfNumbers2 = this.number2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (sumOfNumbers1 === 0 && sumOfNumbers2 === 0) {
      this.result = null
      this.error = "Please drop numbers in either of the boxes"
      return
    }
    
    switch(this.operationSelected) {
      case "addition":
        this.result = sumOfNumbers1 + sumOfNumbers2
        break;
        case "subtraction":
        this.result = sumOfNumbers1 - sumOfNumbers2
        break;
        case "multiplication":
        this.result = sumOfNumbers1 * sumOfNumbers2
        break;
        case "division":
        this.result = sumOfNumbers1 / sumOfNumbers2
        break;
        default: this.result = 0;
    }

    this.error = ""
  }
}
