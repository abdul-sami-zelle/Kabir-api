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


async findAllPaginated(
  page: number = 1,
  limit: number = 10,
  filters?: {
    status?: string;
    customerName?: string;
    customerType?: string;
    fbrRegistrationType?: string; // Registered / Unregistered
    fbrStatus?: string; // ACTIVE / INACTIVE
    provinceCode?: string; // e.g., '0', '01', '02', etc.
  },
): Promise<{
  customers: Customer[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
    currentCount: number;
  };
  cummulations: {
    totalCustomers: number;
    registeredCustomers: number;
    activeCustomers: number;
    totalCompanies?: number;
    totalIndividuals?: number;
    totalVendors?: number;
  };
}> {
  page = Math.max(page, 1);
  limit = Math.max(limit, 1);
  const skip = (page - 1) * limit;

  // Build dynamic MongoDB filter
  const queryFilter: any = {};

  if (filters?.status) queryFilter.status = filters.status;
  if (filters?.customerName) queryFilter.customerName = { $regex: filters.customerName, $options: 'i' };
  if (filters?.customerType) queryFilter.customerType = filters.customerType;

  // FBR filters
  if (filters?.fbrRegistrationType) queryFilter['fbrVerification.type'] = filters.fbrRegistrationType;
  if (filters?.fbrStatus) queryFilter['fbrVerification.status'] = filters.fbrStatus;

  // Province filter
  if (filters?.provinceCode) queryFilter.provinceCode = filters.provinceCode;

  // Total count before pagination
  const totalCount = await this.customerModel.countDocuments(queryFilter);

  // Paginated fetch
  const customers = await this.customerModel
    .find(queryFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPages = Math.ceil(totalCount / limit);
  const currentCount = customers.length;

  // ---------------- CUMMULATIONS ----------------
  const totalCustomers = await this.customerModel.countDocuments({});
  const activeCustomers = await this.customerModel.countDocuments({ status: 'ACTIVE' });
  const registeredCustomers = await this.customerModel.countDocuments({ 'fbrVerification.type': 'Registered' });

  // Optional: breakdown by customerType
  const totalCompanies = await this.customerModel.countDocuments({ customerType: 'company' });
  const totalIndividuals = await this.customerModel.countDocuments({ customerType: 'individual' });
  const totalVendors = await this.customerModel.countDocuments({ customerType: 'vendor' });

  return {
    customers,
    pagination: {
      totalPages,
      currentPage: page,
      totalCount,
      currentCount,
    },
    cummulations: {
      totalCustomers,
      registeredCustomers,
      activeCustomers,
      totalCompanies,
      totalIndividuals,
      totalVendors,
    },
  };
}




}
