import { CreateProductDto } from '../product/create-product.dto';
import { CreateCompanyDto } from '../company/create-company.dto';

export class CreatePleaDto {
  nonVeganProduct: CreateProductDto;
  company: CreateCompanyDto;
  description: string;

  constructor(
    nonVeganProduct: CreateProductDto,
    company: CreateCompanyDto,
    description: string
  ) {
    this.nonVeganProduct = nonVeganProduct;
    this.company = company;
    this.description = description;
  }
}
