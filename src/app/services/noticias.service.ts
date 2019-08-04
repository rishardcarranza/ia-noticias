import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
    'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

    headLinesPage = 0;
    categoriaActual = '';
    categoriaPage = 0;

  constructor(private http: HttpClient) { }

    private ejecutarQuery<T>(query: string) {
        query = apiUrl + query;
        return this.http.get<T>(query, {headers});
    }

  getTopHeadLines() {
      // tslint:disable-next-line: max-line-length
    //   return this.http.get<TopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f283e5222ffe4309976d84aa1d2fbb5a`);
    this.headLinesPage++;
    return this.ejecutarQuery<TopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategoria(categoria: string) {
    //   return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f283e5222ffe4309976d84aa1d2fbb5a`);
    if (this.categoriaActual === categoria) {
        this.categoriaPage++;
    } else {
        this.categoriaPage = 1;
        this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<TopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
