import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schemas/role.schema").RoleDocument, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schemas/role.schema").RoleDocument, "findOne", {}>;
    update(id: string, body: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schemas/role.schema").RoleDocument, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schemas/role.schema").RoleDocument, {}, {}> & import("./schemas/role.schema").Role & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./schemas/role.schema").RoleDocument, "findOneAndDelete", {}>;
}
