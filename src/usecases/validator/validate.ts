import { error } from "console";
import { cpf } from "cpf-cnpj-validator";
import { response } from "express";
import { exit } from "process";

export class Validate {
    validateEmail(email: string): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    validateDocument(document: string): boolean {
        document = document.replace(/[\.-]/g, "");
        return cpf.isValid(document);       
    }
}
