import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
export declare class RolesService {
    private roleModel;
    constructor(roleModel: Model<RoleDocument>);
    create(body: any): Promise<import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, RoleDocument, "find", {}>;
    findById(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, RoleDocument, "findOne", {}>;
    update(id: string, body: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, RoleDocument, "findOneAndUpdate", {}>;
    delete(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, RoleDocument, {}, {}> & Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, RoleDocument, "findOneAndDelete", {}>;
}
