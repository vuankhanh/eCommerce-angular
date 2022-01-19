import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AddressChooseComponent } from '../../sharing/modal/address-choose/address-choose.component';

import { Address, District, Province, Ward } from 'src/app/models/Address';
import { Product } from 'src/app/models/Product';
import { UserInformation } from 'src/app/models/UserInformation';

import { AuthService } from 'src/app/services/auth.service';
import { Cart, CartService } from 'src/app/services/cart.service';
import { AddressModificationService } from 'src/app/services/address-modification.service';
import { ToastService } from 'src/app/services/toast.service';
import { CartApiService } from 'src/app/services/api/cart-api.service';
import { SocketIoService } from 'src/app/services/socket/socket-io.service';

import { Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { AdministrativeUnitsService } from 'src/app/services/api/administrative-units.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('btnInsertAddress') btnInsertAddress: ElementRef;
  @ViewChild('f') form: NgForm;

  private isBrowser: boolean;

  cart: Cart;
  temporaryValue: number = 0;
  totalBill: number = 0;

  customerForm: FormGroup;
  provinces: Array<Province> = [];
  districts: Array<District> = [];
  wards: Array<Ward> = [];

  userInformation: UserInformation | null;
  defaultAddress: Address;

  subscription: Subscription = new Subscription();
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private renderer2: Renderer2,
    private cartService: CartService,
    private authService: AuthService,
    private addressModificationService: AddressModificationService,
    private toastService: ToastService,
    private cartApiService: CartApiService,
    private socketIoService: SocketIoService,
    private administrativeUnitsService: AdministrativeUnitsService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initCart();
    this.listenUserInformation();
    if(this.isBrowser){
      this.listenSocketDataProduct();
    }
  }

  initCart(){
    this.subscription.add(
      this.cartService.listenCartChange().subscribe(cart=>{
        this.cart = cart;
        this.temporaryValue = this.cartService.sumTemporaryValue(this.cart.products);
        if(this.cart.products.length>0){
          this.cartApiService.getTotalBill(this.cart.products).subscribe(res=>{
            this.totalBill = res.totalBill;
          },error=>{
            this.totalBill = 0;
          })
          if(this.cart.deliverTo && !this.defaultAddress){
            this.defaultAddress = this.cart.deliverTo;
            this.initForm(this.defaultAddress);
          }
        }
      })
    )
  }

  initForm(address?: Address){
    let phoneNumberRegEx = /^((0)+([0-9]{9})\b)$/g;

    this.customerForm = this.formBuilder.group({
      responsiblePerson: ['', Validators.required],
      phoneNumber: ['', { validators: [Validators.required, , Validators.pattern(phoneNumberRegEx)] }],
      street: ['', Validators.required],
      ward: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      position: this.formBuilder.group({
        lat: [''],
        lng: ['']
      }),
      isHeadquarters: [false, Validators.required],
    });
    this.getProvince();
    if(address){
      this.customerForm.controls['responsiblePerson'].setValue(address.responsiblePerson);
      this.customerForm.controls['phoneNumber'].setValue(address.phoneNumber);
      this.customerForm.controls['street'].setValue(address.street);
      this.customerForm.controls['isHeadquarters'].setValue(address.isHeadquarters);
      this.customerForm.get('position')?.get('lat')?.setValue(address.position?.lat);
      this.customerForm.get('position')?.get('lng')?.setValue(address.position?.lng);
      if(address.province && address.province.code){
        this.getDistrict(address.province.code);
      }
      if(address.district && address.district.code){
        this.getWard(address.district.code);
      }
    }
  }

  getProvince(){
    this.subscription.add(
      this.administrativeUnitsService.getProvince().subscribe(res=>{
        this.provinces = res;
        if(this.defaultAddress && this.defaultAddress.province){
          let index:number = this.findIndexOfObjectInArray(this.defaultAddress.province._id, this.provinces);
          this.customerForm.controls['province'].setValue(index);
        }
      })
    )
  }

  getDistrict(provinceCode: string, reset?: boolean){
    this.subscription.add(
      this.administrativeUnitsService.getDistrict(provinceCode).subscribe(res=>{
        this.districts = res;
        if(!reset){
          if(this.defaultAddress && this.defaultAddress.district){
            let index:number = this.findIndexOfObjectInArray(this.defaultAddress.district._id, this.districts)
            this.customerForm.controls['district'].setValue(index);
          }
        }else{
          this.customerForm.controls['district'].setValue('');
          this.customerForm.controls['ward'].setValue('');
        }
      }, error=>{
        this.districts = [];
      })
    )
  }

  getWard(districtCode: string, reset?: boolean){
    this.subscription.add(
      this.administrativeUnitsService.getWard(districtCode).subscribe(res=>{
        this.wards = res;
        if(!reset){
          if(this.defaultAddress && this.defaultAddress.ward){
            let index: number = this.findIndexOfObjectInArray(this.defaultAddress.ward._id, this.wards)
            this.customerForm.controls['ward'].setValue(index);
          }
        }else{
          this.customerForm.controls['ward'].setValue('');
        }
      },error=>{
        this.wards = [];
      })
    )
  }

  provinceChange(event: MatSelectChange){
    let index: number = event.value;
    let province: Province = this.provinces[index];
    if(province){
      this.getDistrict(province.code, true);
    }
  }

  districtChange(event: MatSelectChange){
    let index: number = event.value;
    let district: District = this.districts[index];
    if(district){
      this.getWard(district.code, true);
    }
  }

  findIndexOfObjectInArray(
    id: string,
    array: Array<Province> | Array<District> | Array<Ward>
  ){
    return array.findIndex(object=>object._id === id);
  }

  listenUserInformation(){
    this.subscription.add(
      this.authService.getUserInformation().subscribe(userInfo=>{
        this.userInformation = userInfo;
      })
    )
  }

  listenSocketDataProduct(){
    this.subscription.add(
      this.socketIoService.theRemainingAmoutChange$().subscribe(socketData=>{
        if(this.cart){
          let products: Array<Product> = this.cart.products;
          if(products && products.length>0){
            let index: number = products.findIndex(product=>product._id === socketData.product._id);
            if(index >= 0){
              products[index].theRemainingAmount = socketData.product.theRemainingAmount;
              this.cartService.setProduct(products);
            }
          }
        }
      })
    )
  }

  changeQuantity(increase: boolean, index: number){
    let products: Array<Product> = this.cart.products;
    if(increase){
      if(products[index].quantity! < products[index].theRemainingAmount){
        products[index].quantity!++;
      }else{
        this.toastService.shortToastWarning(products[index].name+ ' chỉ còn '+products[index].theRemainingAmount+ ' sản phẩm', '');
      }
    }else{
      if(products[index].quantity! > 1){
        products[index].quantity!--;
      }
    }
    this.cartService.setProduct(products);
    this.temporaryValue = this.cartService.sumTemporaryValue(this.cart!.products);
  }

  showDetail(product: Product){
    this.router.navigate(['productions/'+product.category.route, product.route]);
  }

  quantityInputChange(event: Event, index: number){
    let value = (event.target as HTMLInputElement).value;
    
    let products: Array<Product> = this.cart.products;
    if(this.isNumber(value)){
      if(products[index].quantity! <= products[index].theRemainingAmount){
        products[index].quantity = parseInt(value);
      }else{
        products[index].quantity = products[index].theRemainingAmount;
        this.toastService.shortToastWarning(products[index].name+ ' chỉ còn '+products[index].theRemainingAmount+ ' sản phẩm', '');
      }
    }else{
      products[index].quantity = 1;
    }
    this.cartService.setProduct(products);
    this.temporaryValue = this.cartService.sumTemporaryValue(products);
  }

  laterBuy(cartItem: HTMLDivElement, index: number){
    this.renderer2.addClass(cartItem, 'cart-item-removed');
    setTimeout(() => {
      let products: Array<Product> = this.cart.products;
      products.splice(index, 1);
      this.cartService.setProduct(products);
      this.temporaryValue = this.cartService.sumTemporaryValue(products);
    }, 450);
  }

  changeAddress(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.dialog.open(AddressChooseComponent, {
        panelClass: 'address-choose',
        data: {
          defaultAddress: this.defaultAddress
        }
      }).afterClosed().subscribe(res=>{
        if(res && res.deliverTo){
          let address: Address = res.deliverTo;
          this.defaultAddress = address;
          this.cartService.setDelivery(this.defaultAddress);
        }
      })
    }
  }

  insertAddress(){
    if(!this.userInformation){
      this.authService.login('login');
    }else{
      this.renderer2.removeClass(this.btnInsertAddress.nativeElement, 'button-substyle');
      this.addressModificationService.openAddressModification('insert', null);
    }
  }

  order(){
    if(!this.userInformation){
      if(this.isBrowser){
        this.form.ngSubmit.emit();
      }
    }else{
      if(!this.cart.deliverTo){
        this.renderer2.addClass(this.btnInsertAddress.nativeElement, 'button-substyle');
        this.toastService.shortToastWarning('Bạn chưa tạo vị trí nào trong sổ địa chỉ.', '');
      }else{
        this.navigateToPaymentConfirm();
      }
    }
  }

  customerFormSubmit(){
    this.customerForm.updateValueAndValidity();
    this.customerForm.markAllAsTouched();

    if(this.customerForm.valid){
      let address: Address = this.addressValue();
      this.cartService.setDelivery(address);
      this.navigateToPaymentConfirm();
    }
  }

  navigateToPaymentConfirm(){
    if(this.cart.products.length>0){
      let checkMatchingQuantity = this.cartService.checkMatchingQuantity();

      if(checkMatchingQuantity.length === 0){
        this.router.navigate(['/payment-confirm']);
      }else{
        alert(checkMatchingQuantity)
      }
    }
  }

  isNumber(number: any) {
    return !isNaN(number) && isFinite(number)
  }

  addressValue(): Address{
    let address: Address = {
      street: this.customerForm.value.street,
      responsiblePerson: this.customerForm.value.responsiblePerson,
      phoneNumber: this.customerForm.value.phoneNumber,
      province: this.provinces[this.customerForm.value.province],
      district: this.districts[this.customerForm.value.district],
      ward: this.wards[this.customerForm.value.ward],
      position: this.customerForm.value.position,
      isHeadquarters: this.customerForm.value.isHeadquarters,
    };
    return address;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
