import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiURL;
const headers = new HttpHeaders({
    'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http:HttpClient) { }

    private executeQuery<T>(query: string) {
        query = apiUrl + query;
        return this.http.get<T>(query, {headers});
    }

    getTopHeadLines() {
        return this.executeQuery<TopHeadLines>(`/top-headlines?country=us`);
        // tslint:disable-next-line: max-line-length
        // return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f462be3c9e0949ed839e85474cf2205a`);
    }

    getTopHeadLinesCategory(category: string) {
        return this.executeQuery<TopHeadLines>(`/top-headlines?country=us&category=${category}`);
        // tslint:disable-next-line: max-line-length
        // return this.http.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=f462be3c9e0949ed839e85474cf2205a');
    }

}
