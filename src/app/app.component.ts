import { Component,OnInit} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'productList';
  productList:any;
  closeResult:any;
  product:any;
  changeDetec: any;
  errorMsg:any;
  constructor(private modalService: NgbModal){}
  keyPress(event: any) {
    const pattern = /[0-9\+\-\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnInit() {
    this.productList=[
      {
        productName:"a",
        productId:1,
        productPrice:1000,
        productWeight:100,
      },
      {
        productName:"a",
        productId:1,
        productPrice:1000,
        productWeight:100,
      },
      {
        productName:"a",
        productId:1,
        productPrice:1000,
        productWeight:100,
      }
  ];
  }
  deleteProductList(index:any){
    if (this.productList.length == 1) {
      this.errorMsg="Can't delete the row when there is only one row";
      return false;
    } else {
      this.productList.splice(index, 1);
      return true;
    }
  }
  close(){
    this.modalService.dismissAll();
  }
  addProductList(content:any) {
    this.product={  productName:'',productId:'',
                    productPrice:'',productWeight:''};
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    return true;
  }
  saveProductData(obj:any){
    if(this.isNullorUndefinedorEmpty(obj.productName)){
      this.errorMsg="Please Enter Valid Product Name";
    }else if(this.isNullorUndefinedorEmpty(obj.productPrice)){
      this.errorMsg="Please Enter Valid Product Price";
    }else if(this.isNullorUndefinedorEmpty(obj.productWeight)){
      this.errorMsg="Please Enter Valid Product Weight";
    }else{
    this.modalService.dismissAll();
    this.productList.push(obj);
    this.changeDetec.detectChanges();
  }
  }
  editProductList(content:any,p:any) {
    this.product=p;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  isNullorUndefinedorEmpty(str:any) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
  }
  updateProductDetails(obj:any){
    if(this.isNullorUndefinedorEmpty(obj.productName)){
      this.errorMsg="Please Enter Valid Product Name";
    }else if(this.isNullorUndefinedorEmpty(obj.productPrice)){
      this.errorMsg="Please Enter Valid Product Price";
    }else if(this.isNullorUndefinedorEmpty(obj.productWeight)){
      this.errorMsg="Please Enter Valid Product Weight";
    }else{

      this.modalService.dismissAll();
    }
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

