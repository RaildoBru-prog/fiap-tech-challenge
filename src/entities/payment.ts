export class Payment {
    constructor(
      public readonly id: string,
      public readonly amount: number,
      public readonly description: string,
      public readonly status: string
    ) {}
  }