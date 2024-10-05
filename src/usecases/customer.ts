
import { Injectable } from "@nestjs/common";

import { NotPersistedCustomer, Customer } from 'src/entities/domain/customer';

import { PersistenceCustomerModule } from 'src/persistence/customer/persistence.customer.module';
import { CustomerRepository } from "../repository/ports/customer.repository";
import { CreateCustomerDto } from "src/types/create-customer";

//import { CustomerRepository } from '../../application/ports/customer.repository';
//import { CreateCustomerDto } from './dtos/create-customer.dto';
//import { NotPersistedCustomer } from 'src/entities/domain/customer';

export class CustomerUseCases {
    constructor(private customerRepository : CustomerRepository) {}
    
    private async create(customer: CreateCustomerDto) {
        const newCustomer = new NotPersistedCustomer(customer);
        //this.customerRepository.create(newCustomer);
        return 'teste';
    }

    async findCustomer(email: string, document : string){

        return 'teste';
    }
}  