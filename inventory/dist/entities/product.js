var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AppBaseEntity } from "@sideshop/common";
import { Column, ManyToOne } from "typeorm";
import Brand from "./brand.js";
import Category from "./category.js";
export default class Product extends AppBaseEntity {
}
__decorate([
    Column({ length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Product.prototype, "quantityInStock", void 0);
__decorate([
    Column({ type: "text", length: 10000 }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    ManyToOne(() => Category, (category) => category.products, {
        cascade: true,
    }),
    __metadata("design:type", Category)
], Product.prototype, "category", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    ManyToOne(() => Brand, (brand) => brand.products, {
        cascade: true,
    }),
    __metadata("design:type", Brand)
], Product.prototype, "brand", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "brandId", void 0);
__decorate([
    Column("text", { array: true }),
    __metadata("design:type", Array)
], Product.prototype, "photos", void 0);
//# sourceMappingURL=product.js.map