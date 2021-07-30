import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({name, email}: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('There is already one customer with this email');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
