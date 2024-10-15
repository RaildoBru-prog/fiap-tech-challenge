import { MercadoPagoConfig, Payment } from 'mercadopago'

export class MercadoPagoAdapter {
  
  async createPayment(amount: number, description: string): Promise<string> {
    
    const client = new MercadoPagoConfig({
            accessToken : "TEST-5874670385964177-101223-f96a1cfa1c30713ee14c10636923c05a-529700452",
            options: { timeout: 5000}
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
