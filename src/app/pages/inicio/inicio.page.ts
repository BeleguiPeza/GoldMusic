import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { Template, Category, Shop, Banner } from '../interfaces/interfaces';
import { EditarSubcatComponent } from '../../components/editar-subcat/editar-subcat.component';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { CatService } from '../../services/cat.service';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AboutComponent } from '../../components/about/about.component';

/**
 * Component
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  /**
   * Banners shop
   */
  banner: Banner = {};
  /**
   * Categories Observable
   */
  public categories$: Observable<Category[]>
  /**
   * data branch
   */
  sucu: Shop = {};
  /**
   * last banner
   */
  isEnd;
  /**
   * length banner array
   */
  length;
  /**
   * slider banners
   */
  @ViewChild('ofertas') ofertas;
  /**
   * options slider banner
   */
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1200
   };
  /**
   * options slider banner about
   */
   slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: {
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1200
   };
   /**
    * background
    */
   backgroundFondo: string;
   /**
    * id shop
    */
   argumentos: string;
   /**
    * styles menu
    */
   BarraMenu: Template = {};
   /**
    * styles title about
    */
   QSTitulo: Template = {};
   /**
    * styles body about
    */
   QSCuerpo: Template = {};
   /**
    * styles background about
    */
   QSFondo: Template = {};
   /**
    * styles title category
    */
   CTitulo: Template = {};
   /**
    * styles body category
    */
   CCuerpo: Template = {};
   /**
    * background
    */
   fondo: Template = {};
   /**
    * object data shop
    */
   shops;
   /**
    * id shop
    */
   idShop;
   /**
    * settings shop
    */
   settings: Shop = {};
   /**
    * view config inicio
    */
   config = true;
   /**
    * view config inicio
    */
   vistaconfig = false;
   /**
    * Array about
    */
   about = new Array();
   /** 
 * Image's url
 */
 urlImage = environment.imageUrl;

  /**
   * Method that ensures the correct initialization of the fields, both of the class and of its subclasses
   * @param menuCtrl menu controller service
   * @param actveRoute activate route service
   * @param modalCtrl modal controller service
   * @param shopService shop service
   * @param catService categorys service
   * @param navCtrl nav controller service
   */
  constructor(private menuCtrl: MenuController,
              private actveRoute: ActivatedRoute,
              private modalCtrl: ModalController,
              private shopService: ShopService,
              private catService: CatService,
              private dataService: DataService,
              private navCtrl: NavController) {
                 this.shopService.getDataShop().subscribe((data: any) => {
                  this.idShop = data._id;
                });

               }

  /**
   * Method to handle any additional initialization tasks.
   */
  ngOnInit() {
  }

  /**
   * Fired when the component routing to is about to animate into view.
   */
  ionViewWillEnter(){
    this.vistaconfig = localStorage.getItem('DataAccount') == undefined ? false : true;
    this.fondoColorIma();
    localStorage.setItem('PagCliente', 'si');
  }

  /**
   * Get banner, setting, branch, styles from shop
   */
  fondoColorIma(){
    this.shopService.getDataShop().subscribe((data: any) => {
      localStorage.setItem('idShop', data._id);
      this.idShop = data._id;
      
      this.shopService.getShopId(this.idShop).subscribe((resp: any) => {
        if (!resp.shop.active){
          let fechaExpired;
          const fechaActual = new Date();
          fechaActual.setHours(0,0,0);
          if(resp.shop.expires !== undefined){
            fechaExpired = new Date(resp.shop.expires);
            fechaExpired.setHours(0,0,0)
            fechaExpired.setDate(fechaExpired.getDate() + 14);
            
            if(fechaExpired.getTime() == fechaActual.getTime()){
              this.navCtrl.navigateRoot('/actualizando', {animated: true});
            }
          }
         /*  else{

            this.shops = resp.shop;
            const banList = new Array();
            resp.shop.images.map(bannerData => {
              if (!bannerData.hidden && bannerData.type === 'banner'){
                banList.push(bannerData);
              }
            });
            this.about = [];
            resp.shop.images.map(bannerData => {
              if (bannerData.type === 'about'){
                this.about.push(bannerData);
              }
            });
            this.banner = banList;
            this.settings = this.shops.settings;
            this.sucu = this.shops.branches[0];
            this.BarraMenu = this.shops.template.configs[0];
            this.fondo = this.shops.template.configs[2];
            this.QSTitulo = this.shops.template.configs[3];
            this.QSCuerpo = this.shops.template.configs[4];
            this.QSFondo = this.shops.template.configs[5];
            this.CTitulo = this.shops.template.configs[6];
            this.CCuerpo = this.shops.template.configs[7];
            if (this.fondo.background.length <= 7) {
              this.backgroundFondo = this.fondo.background;
          }else{
            const idbackground = resp.shop.style.find(e => e.type === 'background');
          this.backgroundFondo = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("' + this.fondo.background + '/' + idbackground._id + '") 0 0/100% 100% no-repeat';
          }
          } */
        }
        else{
          this.shops = resp.shop;
          const banList = new Array();
          resp.shop.images.map(bannerData => {
            if (!bannerData.hidden && bannerData.type === 'banner'){
              banList.push(bannerData);
            }
          });
          this.about = [];
          resp.shop.images.map(bannerData => {
            if (bannerData.type === 'about'){
              this.about.push(bannerData);
            }
          });
          this.banner = banList;
          this.settings = this.shops.settings;
          this.sucu = this.shops.branches[0];
          this.BarraMenu = this.shops.template.configs[0];
          this.fondo = this.shops.template.configs[2];
          this.QSTitulo = this.shops.template.configs[3];
          this.QSCuerpo = this.shops.template.configs[4];
          this.QSFondo = this.shops.template.configs[5];
          this.CTitulo = this.shops.template.configs[6];
          this.CCuerpo = this.shops.template.configs[7];
          if (this.fondo.background.length <= 7) {
            this.backgroundFondo = this.fondo.background;
          }else{
            const idbackground = resp.shop.style.find(e => e.type === 'background');
            this.backgroundFondo = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("' + this.fondo.background + '/' + idbackground._id + '") 0 0/100% 100% no-repeat';
          }
        }

      });
      this.categories$ = this.catService.getCategory(this.idShop).pipe(
        map(res => res.result)
      )
      // this.catService.getCategory(this.idShop).subscribe((resp: any) => {
      //   this.cat = resp.result;
      //   //@ts-ignore
      //   this.cat.forEach(categorias => {
      //     categorias.name2 = categorias.name.replace(/ñ/g, 'n').replace(/ /g, '-').replace(/Ñ/g, 'N');
      //     categorias.name2 = categorias.name2.replace(/á/g,'a').replace(/Á/g,'A').replace(/é/g,'e').replace(/É/g,'E').replace(/í/g,'i').replace(/Í/g,'I').replace(/ó/g,'o').replace(/Ó/g,'O').replace(/ú/g,'u').replace(/Ú/g,'U'); 
      //   });
      // });

    });
  }

  /**
   * menu toggle
   */
  toggleMenu(){
    this.menuCtrl.toggle();
  }

  /**
   * change to next slide
   */
   async next() {
    this.isEnd = await this.ofertas.isEnd();
    if (this.isEnd === true){
      this.ofertas.slideTo(0);
    }else{
      this.ofertas.slideNext();
    }
  }

  /**
   * change to prev slide
   */
  async prev() {
    this.isEnd = await this.ofertas.isBeginning();
    if (this.isEnd === true){
      this.length = await this.ofertas.length();
      this.length = --this.length;
      this.ofertas.slideTo(this.length);
    }else{
      this.ofertas.slidePrev();
    }
  }

  /**
   * change to next slide about
   * @param slides slider
   */
  async nextC(slides) {
    this.isEnd = await slides.isEnd();
    if (this.isEnd === true){
      slides.slideTo(0);
    }else{
      slides.slideNext();
    }
  }

  /**
   * change to next slide about
   * @param slides slider
   */
  async prevC(slides) {
    this.isEnd = await slides.isBeginning();
    if (this.isEnd === true){
      this.length = await slides.length();
      this.length = --this.length;
      slides.slideTo(this.length);
    }else{
      slides.slidePrev();
    }

  }

  /**
   * Open modal search order
   */
  async abrirModal(){
    const modal = await this.modalCtrl.create({
      component: EditarSubcatComponent,
      cssClass: 'buscar'
    });
    await modal.present();
  }

  /**
   * Change to home configuration view
   */
  vistaCC(){
    this.navCtrl.navigateRoot('/inicioadmin', {animated: true});
  }

  public goToCategory(name: string, number: number) {
    this.navCtrl.navigateRoot(`/subcategory/${name}`, { animated: true, queryParams: { number } });
  }

  public goToItem(name: string, number: number) {
    this.navCtrl.navigateRoot(`/item/${name}`, { animated: true, queryParams: { number } });
  }

  async learnmore(){
    const modal = await this.modalCtrl.create({
      component: AboutComponent,
      cssClass: 'about'
    });
    await modal.present();
  }

}
