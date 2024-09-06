// src/app/order-return.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderReturnService {
  private apiUrl =  environment.apiUrl + environment.webId + '/returns'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  async getOrderReturns(page: number, keyword?: string): Promise<any> {
    try {
      const url = `${this.apiUrl}?page=${page}${keyword ? `&keyword=${keyword}` : ''}`;
      const response = await this.http.get(url).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching order returns:', error);
      throw error;
    }
  }

  async createOrderReturn(data: any): Promise<any> {
    try {
      const response = await this.http.post(this.apiUrl, data).toPromise();
      return response;
    } catch (error) {
      console.error('Error creating order return:', error);
      throw error;
    }
  }

  async getOrderReturn(id: number): Promise<any> {
    try {
      const response = await this.http.get(`${this.apiUrl}/${id}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error fetching order return details:', error);
      throw error;
    }
  }

  async updateOrderReturn(id: number, data: any): Promise<any> {
    try {
      const response = await this.http.put(`${this.apiUrl}/${id}`, data).toPromise();
      return response;
    } catch (error) {
      console.error('Error updating order return:', error);
      throw error;
    }
  }

  async deleteOrderReturn(id: number): Promise<any> {
    try {
      const response = await this.http.delete(`${this.apiUrl}/${id}`).toPromise();
      return response;
    } catch (error) {
      console.error('Error deleting order return:', error);
      throw error;
    }
  }
}
