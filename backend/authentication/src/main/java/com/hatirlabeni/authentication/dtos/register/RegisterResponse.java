package com.hatirlabeni.authentication.dtos.register;

import com.hatirlabeni.authentication.dtos.user.AuthUserResponse;
import com.hatirlabeni.authentication.dtos.user.UserResponse;

public record RegisterResponse(
        AuthUserResponse authUserResponse,
        UserResponse userResponse
) {
}
