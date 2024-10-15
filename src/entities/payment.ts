export class Payment {
    constructor(
      public readonly id: string,
      public readonly amount: number,
      public readonly status: string
    ) {}
  }