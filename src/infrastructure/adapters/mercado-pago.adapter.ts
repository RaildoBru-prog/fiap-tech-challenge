import { MercadoPagoConfig, Payment } from 'mercadopago'

export class MercadoPagoAdapter {
  
  async createPayment(amount: number, description: string): Promise<string> {
    
    const client = new MercadoPagoConfig({
            accessToken : "TEST-5874670385964177-101223-f96a1cfa1c30713ee14c10636923c05a-529700452",
            options: { timeout: 5000, idempotencyKey: 'abc' }
        });

        const body = {
            transaction_amount: 20.30,
            description: 'teste',
            payment_method_id : 'pix',
            payer: {
                email: 'raildobruno1992@gmail.com'
            }
        }

    const payment = new Payment(client);
    
    const teste = await payment.create({ body }).then(console.log);
    console.log(teste)
    return 'teste'
  }
}


/**
 * import { MercadoPagoConfig, Payment } from 'mercadopago';

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({ accessToken: 'access_token', options: { timeout: 5000, idempotencyKey: 'abc' } });

// Step 3: Initialize the API object
const payment = new Payment(client);

// Step 4: Create the request object
const body = {
	transaction_amount: 12.34,
	description: '<DESCRIPTION>',
	payment_method_id: '<PAYMENT_METHOD_ID>',
	payer: {
		email: '<EMAIL>'
	},
};

// Step 5: Create request options object - Optional
const requestOptions = {
	idempotencyKey: '<IDEMPOTENCY_KEY>',
};

// Step 6: Make the request
payment.create({ body, requestOptions }).then(console.log).catch(console.log);
 * 
 */