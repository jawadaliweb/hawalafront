import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'services/customers.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  custform = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  get name() {
    return this.custform.get('name');
  }
  get address() {
    return this.custform.get('address');
  }
  get phone() {
    return this.custform.get('phone');
  }

  constructor(public customer: CustomersService) {}
  ngOnInit(): void {
    this.customer.getCustomers();
  }
  message: boolean = false;
  addCustomer() {
    if (this.custform.invalid) {
      this.isClicked = true;
    } else {
      if (this.customerid) {
        let data = new FormData();
        if (this.name?.value) data.append('name', <any>this.name?.value);
        if (this.address?.value)
          data.append('address', <any>this.address?.value);
        if (this.phone?.value) data.append('phone', <any>this.phone?.value);
        this.customer.editCustomers(data, this.customerid);
        this.custform.reset();
        document.getElementById('custFormModelClose')?.click();
        this.customerid = null;
      } else {
        let data = new FormData();
        data.append('name', <any>this.name?.value);
        data.append('phone', <any>this.phone?.value);
        data.append('address', <any>this.address?.value);
        this.customer.postCustomers(data);
        this.message = true;
        this.custform.reset();
        document.getElementById('custFormModelClose')?.click();
      }
    }
  }
  reset() {
    if (this.customerid) {
      this.custform.reset();
      this.customerid = null;
    }
  }

  customerid: any;
  isClicked: boolean = false;
  edit(id: any) {
    this.customerid = id;
    let customer = this.customer.customers.find((cus) => cus.id == id);
    this.name?.setValue(customer.name);
    this.address?.setValue(customer.address);
    this.phone?.setValue(customer.phone);
  }
  delete(id: any) {
    this.customer.deleteCustomer(id);
  }
  cicon(event: any) {
    const toast = document.getElementById('success');
    event.target.parentElement.remove();
  }
}
