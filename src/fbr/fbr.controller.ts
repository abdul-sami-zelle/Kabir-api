import { Controller, Get, Query, Post } from '@nestjs/common';
import { FbrService } from './fbr.service';

@Controller('fbr')
export class FbrController {
    constructor(private readonly fbrService: FbrService) { }

    // 📌 1. Get Provinces
    @Get('provinces')
    getProvinces() {
        return this.fbrService.getProvinces();
    }

    // 📌 1. Get Provinces
    @Get('sale-types')
    getSaleTypes() {
        return this.fbrService.getSaleTypes();
    }

    // =================== HS Codes ===================
    @Post('hs-codes/sync')
    syncHSCodes() {
        return this.fbrService.syncHSCodes();
    }

    @Get('hs-codes')
    async getHSCodes(
        @Query('hS_CODE') hS_CODE?: string,
        @Query('description') description?: string,
        @Query('limit') limit?: string,   // optional, default 100
        @Query('skip') skip?: string,     // optional, for pagination
    ) {
        const filter: any = {};

        if (hS_CODE) filter.hS_CODE = { $regex: hS_CODE, $options: 'i' };
        if (description) filter.description = { $regex: description, $options: 'i' };

        const maxLimit = parseInt(limit!) || 100;
        const offset = parseInt(skip!) || 0;

        return this.fbrService.getHSCodesFromDB(filter, maxLimit, offset);
    }


    // =================== UOMs ===================
    @Post('uoms/sync')
    syncUOMs() {
        return this.fbrService.syncUOMs();
    }

    @Get('uoms')
    getUOMs(@Query('uoM_ID') uoM_ID?: number, @Query('description') description?: string) {
        return this.fbrService.getUOMsFromDB({ uoM_ID, description });
    }

    // 📌 3. Get Tax Rates
    @Get('tax-rates')
    getRates() {
        return this.fbrService.getTaxRates();
    }

    // 📌 4. Validate Invoice (FBR QR Scan)
    @Get('validate-invoice')
    validateInvoice(@Query('code') code: string) {
        return this.fbrService.validateInvoice(code);
    }

    @Get('get-tax')
    GetTaxAmount(
        @Query('date') date: string,
        @Query('transactionTypeId') transactionTypeId: string,
        @Query('provinceCode') provinceCode: string,
    ) {
        return this.fbrService.getTaxAmount(date, transactionTypeId, provinceCode);
    }

}
