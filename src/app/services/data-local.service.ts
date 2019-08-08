import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

    noticias: Article[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
      this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

    guardarNoticia(noticia: Article) {

        const existe = this.noticias.find(item => item.title === noticia.title);

        if (!existe) {
            this.noticias.unshift(noticia);
            this.storage.set('favoritos', this.noticias);

        }
        this.presentToast('Agregado a Favoritos');
    }

    async cargarFavoritos() {
        const favoritos = await this.storage.get('favoritos');

        if (favoritos) {
            this.noticias = favoritos;
        }
            // .then(favoritos => {
            //     console.log('cargarFavoritos', favoritos);
            // });
    }

    borrarNoticia(noticia: Article) {
        this.noticias = this.noticias.filter(item => item.title !== noticia.title);
        this.storage.set('favoritos', this.noticias);
        this.presentToast('Borrado de Favoritos');
    }
}
