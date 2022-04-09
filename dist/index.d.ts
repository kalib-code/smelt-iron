import * as axios from 'axios';
import { AxiosInstance } from 'axios';

interface Pagination {
    current?: number;
    pageSize?: number;
}
declare type BaseKey = string | number;
declare type BaseRecord = {
    id?: BaseKey;
    [key: string]: any;
};
interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}
declare type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};
declare type VariableOptions = {
    type?: string;
    name?: string;
    value: any;
    list?: boolean;
    required?: boolean;
} | {
    [k: string]: any;
};
declare type Fields = Array<string | object | NestedField>;
declare type MetaDataQuery = {
    [k: string]: any;
} & QueryBuilderOptions;
declare type CrudOperators = 'eq' | 'ne' | 'lt' | 'gt' | 'lte' | 'gte' | 'in' | 'nin' | 'contains' | 'ncontains' | 'containss' | 'ncontainss' | 'between' | 'nbetween' | 'null' | 'nnull' | 'or';
declare type LogicalFilter = {
    field: string;
    operator: Exclude<CrudOperators, 'or'>;
    value: any;
};
declare type ConditionalFilter = {
    operator: 'or';
    value: LogicalFilter[];
};
declare type CrudFilter = LogicalFilter | ConditionalFilter;
declare type CrudSort = {
    field: string;
    order: 'asc' | 'desc';
};
declare type CrudFilters = CrudFilter[];
declare type CrudSorting = CrudSort[];
interface CustomResponse<TData = BaseRecord> {
    data: TData;
}
interface GetListResponse<TData = BaseRecord> {
    data: TData[];
    total: number;
}
interface CreateResponse<TData = BaseRecord> {
    data: TData;
}
interface CreateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface UpdateResponse<TData = BaseRecord> {
    data: TData;
}
interface UpdateManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface GetOneResponse<TData = BaseRecord> {
    data: TData;
}
interface GetManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface DeleteOneResponse<TData = BaseRecord> {
    data: TData;
}
interface DeleteManyResponse<TData = BaseRecord> {
    data: TData[];
}
interface IDataContextProvider {
    getList: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        pagination?: Pagination;
        sort?: CrudSorting;
        filters?: CrudFilters;
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetListResponse<TData>>;
    getMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
        dataProviderName?: string;
    }) => Promise<GetManyResponse<TData>>;
    getOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<GetOneResponse<TData>>;
    create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<CreateResponse<TData>>;
    createMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        variables: TVariables[];
        metaData?: MetaDataQuery;
    }) => Promise<CreateManyResponse<TData>>;
    update: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        id: BaseKey;
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateResponse<TData>>;
    updateMany: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
        resource: string;
        ids: BaseKey[];
        variables: TVariables;
        metaData?: MetaDataQuery;
    }) => Promise<UpdateManyResponse<TData>>;
    deleteOne: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        id: BaseKey;
        metaData?: MetaDataQuery;
    }) => Promise<DeleteOneResponse<TData>>;
    deleteMany: <TData extends BaseRecord = BaseRecord>(params: {
        resource: string;
        ids: BaseKey[];
        metaData?: MetaDataQuery;
    }) => Promise<DeleteManyResponse<TData>>;
    getApiUrl: () => string;
    custom?: <TData extends BaseRecord = BaseRecord>(params: {
        url: string;
        method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch';
        sort?: CrudSorting;
        filters?: CrudFilter[];
        payload?: {};
        query?: {};
        headers?: {};
        metaData?: MetaDataQuery;
    }) => Promise<CustomResponse<TData>>;
}

declare const DataProvider: (apiUrl: string, httpClient?: AxiosInstance) => IDataContextProvider;

interface ILoginResponse {
    jwt: string;
    user: IUser;
}
interface IRole {
    id: number | string;
    name: string;
    description: string;
    type: string;
}
interface IUser {
    id: number | string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    created_at: string;
    updated_at: string;
}
declare const AuthHelper: (apiUrl: string) => {
    login: (identifier: string, password: string) => Promise<axios.AxiosResponse<ILoginResponse>>;
    me: (token: string) => Promise<axios.AxiosResponse<IUser>>;
};

declare const getValueProps: (data: any, imageUrl: string) => {
    fileList: never[];
    file?: undefined;
} | {
    file: any;
    fileList: any;
};
declare const mediaUploadMapper: (params: any) => any;

interface StrapiUploadParams {
    maxCount: number;
}
declare type UseStrapiUploadType = {
    (uploadParams: StrapiUploadParams): {
        uploadedFileIds: string[];
        beforeUpload: (_file: any, files: any[]) => boolean;
        fileList: any[];
        maxCount: number;
    };
};
declare const useStrapiUpload: UseStrapiUploadType;

export { AuthHelper, DataProvider, getValueProps, mediaUploadMapper, useStrapiUpload };
