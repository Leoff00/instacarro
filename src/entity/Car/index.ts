export class Car {
  model: string;
  licensePlate: string;
  name: string;
  manufacture: string;
  price: number;

  constructor(
    model: string,
    licensePlate: string,
    name: string,
    manufacture: string,
    price: number
  ) {
    this.model = model;
    this.licensePlate = licensePlate;
    this.name = name = name;
    this.manufacture = manufacture;
    this.price = price;
  }

  public validateLicensePlate(): boolean {
    const plateRegex = /^[A-Za-z]{3}\d{4}$/gm;
    const letters = this.licensePlate.slice(0, 3);
    const invalidMatch = ["KWY", "KYW", "WKY", "WYK", "YKW", "YWK"];

    if (!plateRegex.test(this.licensePlate)) return false;

    const isValidPlate = invalidMatch.some((matches) => matches !== letters);
    if (isValidPlate) return true;
  }
}
