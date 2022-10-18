import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styles: [
  ]
})
export class FinanceComponent implements OnInit {

  incomeForm!: FormGroup;
  type: string = 'ingreso';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  doSave() {

    if (this.incomeForm.invalid) return;

    console.log(this.incomeForm.value);
    console.log(this.type);
  }
}
