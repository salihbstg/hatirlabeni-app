package com.hatirlabeni.userservice.service.interfaces;

import com.hatirlabeni.userservice.dtos.*;
import org.jspecify.annotations.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {
    UserResponse createUser(CreateUserRequest createUserRequest);
    Page<UserProfileResponse> getAllUsers(String search,Pageable pageable);
    UserProfileResponse getMe();
    UserProfileResponse updateUser(UpdateUserRequest updateUserRequest);
    UserProfileResponse changeUserStatus(UUID userId);
    void deleteUser(UUID uuid);
    UserProfileResponse getUserByNationalId(String nationalId);
    UserProfileResponse getUserByPhoneNumber(String phoneNumber);
    UserProfileResponse getUserByUuid(UUID uuid);
    UserProfileResponse updateUserByUUIDForAdmin(UUID uuid, UpdateUserRequest updateUserRequest);
    UserProfileResponse getUserByEmail(String email);

    Boolean isActive(UUID uuid);
}
