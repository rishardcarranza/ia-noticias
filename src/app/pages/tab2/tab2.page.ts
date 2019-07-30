import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    @ViewChild(IonSegment) segment: IonSegment;

    categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

    ngOnInit() {
        console.log('tab2');
        this.cargarNoticias(this.segment.value);
    }

    cambioCategoria(event) {
        this.noticias = [];
        this.cargarNoticias(event.detail.value);
    }

    cargarNoticias(categoria: string) {
        // this.segment.value = this.categorias[0];
        this.noticiasService.getTopHeadLinesCategory(categoria)
            .subscribe(resp => {
                // console.log('cargarNoticias', resp)
                this.noticias.push(...resp.articles);
            });
    }
}
