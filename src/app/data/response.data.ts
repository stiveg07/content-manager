import { Folder } from "../interfaces/folder.interface";

export interface ApiResponse {
    isSuccess: boolean;
    result: Folder[];
    statusCode: number;
    errorMessages?: string;
}