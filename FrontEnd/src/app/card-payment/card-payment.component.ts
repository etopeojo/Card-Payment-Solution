import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { CreditCardPaymentFacade } from "../store/facade";
import { currentDate } from "../store/reducer";

@Component({
  selector: "app-card-payment",
  templateUrl: "./card-payment.component.html",
  styleUrls: ["./card-payment.component.scss"],
})
export class CardPaymentComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();

  paymentForm: FormGroup;
  errorMessage: string;
  currentDate = new Date();
  currentMonth = currentDate.getMonth() + 1;
  currentYear = currentDate.getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private facade: CreditCardPaymentFacade
  ) {}

  ngOnInit() {
    this.errorMessage = "Please Fill all fields";
    this.buildForm();
  }

  buildForm() {
    this.paymentForm = this.formBuilder.group({
      amount: [
        "",
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      nameOnCard: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern("^[A-Za-z][A-Za-z -]*$"),
        ],
      ],
      cardNumber: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35d{3})d{11})$"
          ),
        ],
      ],
      expirationMonth: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(2),
          Validators.min(this.currentMonth),
          Validators.max(12),
        ],
      ],
      expirationYear: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(this.currentYear),
          Validators.max(9999),
        ],
      ],
      cardCCVNumber: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.min(111),
          Validators.max(999),
        ],
      ],
    });
  }

  // convenience getter for easy access to form fields
  get formControls() {
    return this.paymentForm.controls;
  }

  onSubmit() {
    this.submitForm();
  }

  submitForm() {
    console.log("++++++++++++++++++");
    console.log(this.currentMonth);
    console.log(this.paymentForm);
    if (this.paymentForm.status === "VALID") {
      const expiryDate = new Date(
        this.paymentForm.get("expirationYear").value,
        this.paymentForm.get("expirationMonth").value,
        1
      );
      const paymentFormData = {
        creditCardNumber: this.paymentForm.get("cardNumber").value.toString(),
        cardHolder: this.paymentForm.get("nameOnCard").value,
        expirationDate: expiryDate,
        securityCode: this.paymentForm.get("cardCCVNumber").value,
        amount: this.paymentForm.get("amount").value,
      };

      this.facade.makePayment(paymentFormData);
    } else {
      this.errorMessage = "The Form is Invalid!";
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
