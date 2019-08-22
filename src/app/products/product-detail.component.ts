import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "./product.service";
import { IProduct } from "./product";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    //'+' is a shortcut to convert a string value to a numeric value
    let id = +this.route.snapshot.paramMap.get("id");
    this.pageTitle += `: ${id}`;

    this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.find(p => p.productId == id);
      },
      error: err => (this.errorMessage = err)
    });
  }

  onBack(): void {
    this.router.navigate(["/products"]);
  }
}
