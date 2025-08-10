import api from "@/common/axios";
import { AxiosResponse } from "axios";

type ResponseResult<T> = {
    message: string;
    data: T;
}

type SignInResponse = {
    accessToken: string;
    refreshToken: string;
}

class AdminAuthService {

    async signIn(username: string, password: string): Promise<ResponseResult<SignInResponse>> {
        const response = await api.post("/admin/auth/login", {
            username,
            password,
        }) as AxiosResponse<ResponseResult<SignInResponse>>;
        return response.data;
    }
}

export const adminAuthService = new AdminAuthService