import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { FbrService } from 'src/fbr/fbr.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    private readonly fbrService: FbrService,
  ) { }


  // Create
  async create(data: any): Promise<Customer> {

    if (data.cnic) {
      const today = new Date().toISOString().split('T')[0];

      const regType = await this.fbrService.checkRegistrationType(data.cnic);
      const status = await this.fbrService.checkActiveStatus(data.cnic, today);

      data.fbrVerification = {
        type: regType,
        status,
        checkedOn: new Date(),
      };
    }

    const customer = new this.customerModel(data);
    return customer.save();
  }

  // Get All
  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  // Get One
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) throw new NotFoundException('Customer not found');
    return customer;
  }

  // Update
  async update(id: string, data: any): Promise<Customer> {
    const updated = await this.customerModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Customer not found');
    return updated;
  }

  // Delete
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Customer not found');
    return { message: 'Customer deleted successfully' };
  }
}
