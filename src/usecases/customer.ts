
import { Injectable } from "@nestjs/common";
import { NotPersistedCustomer, Customer } from 'src/entities/domain/customer';
import { PersistenceCustomerModule } from 'src/persistence/customer/persistence.customer.module';
import { CustomerRepository } from "../repository/ports/customer.repository";
import { Validate } from "./validator/validate"
import { CreateCustomerDto } from "src/types/create-customer";
import { CustomerMapper } from '../persistence/customer/customer.mapper';

export class CustomerUseCases {
    constructor(private customerRepository: CustomerRepository){}
    
    async create(customer: CreateCustomerDto) {
        const newCustomer = new NotPersistedCustomer(customer);
        
        /*if(!( new Validate().validateEmail(newCustomer.email))) {
            return 'Email invalido.';
        }*/
        /*if(!( new Validate().validateDocument(newCustomer.document))){
            return 'Numero do documento invalido.';
        }*/

        let customerFound = await this.customerRepository.findByEmailAndDocument(newCustomer.email, newCustomer.document);
        if(customerFound){
            return customerFound;
        }

        return await this.customerRepository.create(newCustomer);
    }

    async findCustomer(email: string, document : string){
        
        if(!( new Validate().validateEmail(email))) {
            return 'Email invalido.';
        }

        /*if(!( new Validate().validateDocument(document))){
            return 'Numero do documento invalido.';
        }/*/
        return this.customerRepository.findByEmailAndDocument(email, document);
    }
}  