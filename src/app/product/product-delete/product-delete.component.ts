import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productForm?: FormGroup;
  id?: number;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl(),
    })
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) =>{
      // @ts-ignore
      this.id = +paramMap.get('id');
      const product = this.getProduct(this.id);
      console.log(product?.id)
      this.productForm?.patchValue({
        id: product?.id,
        name: product?.name,
        price: product?.price,
        description: product?.description,
      })
    })
  }

  getProduct(id: number) {
    return this.productService.findById(id);
  }

  deleteProduct(id: any) {


     if (confirm('Are You Sure?') == true){
       this.productService.deleteProduct(id);
       alert('Xoá thành công');
       this.router.navigate(['product/list']);
     }

  }
}
