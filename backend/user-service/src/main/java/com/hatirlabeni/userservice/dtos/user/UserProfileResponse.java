package com.hatirlabeni.userservice.dtos.user;

import com.hatirlabeni.userservice.dtos.feign.AuthUserResponse;

public record UserProfileResponse(
        UserResponse user,
        AuthUserResponse auth
) {

}
