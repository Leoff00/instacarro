import crypto from "node:crypto";

export class User {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    name: string,
    lastname: string,
    email: string,
    createdAt?: Date,
    id?: string
  ) {
    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.createdAt = createdAt;
  }

  public validateEmailFormat(): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(this.email);
  }
}
