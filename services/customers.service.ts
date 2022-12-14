import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}
  url: string = 'http://127.0.0.1:8000/api/';
  mediaurl: string = 'http://127.0.0.1:8000/';

  customers: any[] = [];
  getCustomers() {
    this.http.get(this.url + 'customers/').subscribe((res) => {
      this.customers = <any>res;
    });
  }

  postCustomers(data: any) {
    this.http.post(this.url + 'customers/', data).subscribe((res: any) => {
      this.customers.unshift(res);
    });
  }

  editCustomers(data: any, id: any) {
    this.http
      .patch(this.url + 'customers/' + id + '/', data)
      .subscribe((res: any) => {
        let index = this.customers.findIndex((cus) => cus.id == id);
        this.customers.splice(index, 1, res);
      });
  }

  deleteCustomer(id: any) {
    this.http.delete(this.url + 'customers/' + id + '/').subscribe(() => {
      let index = this.customers.findIndex(
        (customeritem) => customeritem.id == id
      );

      this.customers.splice(index, 1);
    });
  }
}
