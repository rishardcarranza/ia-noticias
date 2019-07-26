import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http:HttpClient) { }

    getTopHeadLines() {
        return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f462be3c9e0949ed839e85474cf2205a`);
    }

}
