import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    // ✅ CREATE CUSTOMER WITH IMAGE UPLOAD
    @Post()
    @UseInterceptors(
        FileInterceptor('profile', {
            storage: diskStorage({
                destination: './uploads/customers',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
            limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
        }),
    )

    async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        if (file) {
            body.logoUrl = `/uploads/customers/${file.filename}`;
        }
        return this.customersService.create(body);
    }

    // ✅ GET ALL CUSTOMERS
    @Get()
    findAll() {
        return this.customersService.findAll();
    }

    // ✅ GET ONE CUSTOMER
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customersService.findOne(id);
    }

    // ✅ UPDATE CUSTOMER (OPTIONAL IMAGE)
    @Put(':id')
    @UseInterceptors(
        FileInterceptor('profile', {
            storage: diskStorage({
                destination: './uploads/customers',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        if (file) {
            body.logoUrl = `/uploads/customers/${file.filename}`;
        }
        return this.customersService.update(id, body);
    }

    // ✅ DELETE CUSTOMER
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customersService.remove(id);
    }
}
