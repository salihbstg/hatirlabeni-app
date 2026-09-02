package com.hatirlabeni.userservice.dtos;

public record UserProfileResponse(
        UserResponse user,
        AuthUserResponse auth
) {

}
