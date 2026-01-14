import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HSCodeDocument } from './schemas/hs-codes.schema';
import { UOMDocument } from './schemas/uom.schema';

@Injectable()
export class FbrService {
  constructor(
    @InjectModel('HSCode') private hsCodeModel: Model<HSCodeDocument>,
    @InjectModel('UOM') private uomModel: Model<UOMDocument>,
  ) { }

  // 🔹 Common FBR API caller
  private async callFBR(apiUrl: string) {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { Authorization: `Bearer ${process.env.FBR_GET_API_KEY}` },
      });

      const text = await response.text(); // read as text first
      if (!text) {
        throw new Error('Empty response from FBR API');
      }

      try {
        return JSON.parse(text); // parse JSON
      } catch (err) {
        console.error('FBR API returned non-JSON response:', text);
        throw new Error('Invalid JSON response from FBR API');
      }
    } catch (error) {
      console.error('Error calling FBR API:', error.message);
      throw new Error(`FBR API request failed: ${error.message}`);
    }
  }

  // =================== FBR API Calls ===================

  async getSaleTypes() {
    return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/transtypecode');
  }

  async getProvinces() {
    return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/provinces');
  }

  async getUOMs() {
    return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/uom');
  }

  async getHSCODES() {
    return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/itemdesccode');
  }

  async getTaxRates() {
    return this.callFBR('https://gw.fbr.gov.pk/di_data/v1/get/taxrates');
  }

  async validateInvoice(qrCode: string) {
    const url = `https://gw.fbr.gov.pk/di_data/v1/qr/verify?data=${encodeURIComponent(qrCode)}`;
    return this.callFBR(url);
  }

  async getTaxAmount(date: string, transactionTypeId: string, provinceCode: string) {
    const url = `https://gw.fbr.gov.pk/pdi/v2/SaleTypeToRate?transTypeId=${transactionTypeId}&originationSupplier=${provinceCode}&date=${date}`;
    return this.callFBR(url);
  }

  // =================== DB Operations for HS Codes ===================

  async syncHSCodes() {
    const hsCodes = await this.getHSCODES();
    const bulkOps = hsCodes.map(h => ({
      updateOne: {
        filter: { hS_CODE: h.hS_CODE },
        update: { $set: h },
        upsert: true,
      },
    }));
    if (bulkOps.length) await this.hsCodeModel.bulkWrite(bulkOps);
    return { message: 'HS Codes synced successfully', count: bulkOps.length };
  }

  async getHSCodesFromDB(
    filter?: { hS_CODE?: string; description?: string },
    limit = 100,
    skip = 0,
  ) {
    const query: any = filter || {};
    return this.hsCodeModel.find(query).limit(limit).skip(skip).sort({ hS_CODE: 1 });
  }

  // =================== DB Operations for UOMs ===================

  async syncUOMs() {
    const uoms = await this.getUOMs();
    const bulkOps = uoms.map(u => ({
      updateOne: {
        filter: { uoM_ID: u.uoM_ID },
        update: { $set: u },
        upsert: true,
      },
    }));
    if (bulkOps.length) await this.uomModel.bulkWrite(bulkOps);
    return { message: 'UOMs synced successfully', count: bulkOps.length };
  }

  async getUOMsFromDB(filter?: { uoM_ID?: number; description?: string }) {
    const query: any = {};
    if (filter?.uoM_ID) query.uoM_ID = filter.uoM_ID;
    if (filter?.description) query.description = { $regex: filter.description, $options: 'i' };
    return this.uomModel.find(query);
  }


  private async callFBRPost(apiUrl: string, payload: any) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.FBR_GET_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      if (!text) throw new Error('Empty response from FBR API');

      return JSON.parse(text);
    } catch (error) {
      console.error('FBR POST API Error:', error.message);
      throw new Error(`FBR POST request failed: ${error.message}`);
    }
  }
  async checkRegistrationType(cnic: string): Promise<'Registered' | 'Unregistered'> {
    const response = await this.callFBRPost(
      'https://gw.fbr.gov.pk/dist/v1/Get_Reg_Type',
      { Registration_No: cnic },
    );

    console.log(response?.REGISTRATION_TYPE,"checkRegistrationType")

    return response?.REGISTRATION_TYPE?.trim() === 'Registered'
      ? 'Registered'
      : 'Unregistered';
  }


  async checkActiveStatus(
  cnic: string,
  date: string,
): Promise<'ACTIVE' | 'INACTIVE'> {

  const response = await this.callFBRPost(
    'https://gw.fbr.gov.pk/dist/v1/statl',
    {
      regno: cnic,
      date,
    },
  );

  console.log(response,"checkActiveStatus")

  return response?.status === 'Active'
    ? 'ACTIVE'
    : 'INACTIVE';
}



}
