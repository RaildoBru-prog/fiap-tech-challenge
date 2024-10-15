import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repository/ports/customer.repository';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { NotPersistedCustomer } from 'src/entities/domain/customer';
import  { CustomerUseCases } from 'src/usecases/customer';

@Injectable()
export class CustomerController {
  constructor(private customerRepository: CustomerRepository){}
  
  async create(customer: CreateCustomerDto) {
    const newCustomer = new NotPersistedCustomer(customer);
    const customerCase = new CustomerUseCases(this.customerRepository);
    return await customerCase.create(newCustomer);
  }

  async login(email: string, document: string) {
    const customerCase = new CustomerUseCases(this.customerRepository);
    return await customerCase.findCustomer(email, document);
  }
}
