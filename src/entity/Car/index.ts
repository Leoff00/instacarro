export class Car {
  carModel: string;
  licensePlate: string;
  name: string;
  manufacture: string;
  price: number;

  constructor(
    carModel: string,
    licensePlate: string,
    name: string,
    manufacture: string,
    price: number
  ) {
    this.carModel = carModel;
    this.licensePlate = licensePlate;
    this.name = name = name;
    this.manufacture = manufacture;
    this.price = price;
  }

  public availableCarPlate(): boolean {
    const plateRegex = /^[A-Za-z]{3}\d{4}$/gm;
    const letters = this.licensePlate.slice(0, 3);
    const invalidMatch = ["KWY", "KYW", "WKY", "WYK", "YKW", "YWK"];

    if (!plateRegex.test(this.licensePlate)) return false;

    const isValidPlate = invalidMatch.some((matches) => matches !== letters);
    return isValidPlate;
  }
}
