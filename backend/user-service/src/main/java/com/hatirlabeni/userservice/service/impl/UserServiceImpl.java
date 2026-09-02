package com.hatirlabeni.userservice.service.impl;

import com.hatirlabeni.userservice.dtos.*;
import com.hatirlabeni.userservice.entity.User;
import com.hatirlabeni.userservice.exception.AdminStatusChangeNotAllowedException;
import com.hatirlabeni.userservice.exception.DuplicateUserException;
import com.hatirlabeni.userservice.exception.RootIsImmutableException;
import com.hatirlabeni.userservice.exception.UserNotFoundException;
import com.hatirlabeni.userservice.feign.AuthFeign;
import com.hatirlabeni.userservice.mapper.UserMapper;
import com.hatirlabeni.userservice.repository.UserRepository;
import com.hatirlabeni.userservice.security.SecurityContextHelper;
import com.hatirlabeni.userservice.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthFeign authFeign;
    private final SecurityContextHelper securityContextHelper;

    private User findUser(UUID uuid) {
        return userRepository.findByUuid(uuid).orElseThrow(UserNotFoundException::new);
    }

    private UserProfileResponse toUserProfileResponse(UserResponse userResponse, AuthUserResponse authUserResponse) {
        return new UserProfileResponse(
                userResponse,
                authUserResponse
        );
    }

    private Page<UserProfileResponse> toUserProfileResponsePage(Page<UserResponse> userResponses) {
        return userResponses.map(user ->
                new UserProfileResponse(
                        user,
                        authFeign.getByUuid(user.uuid())
                )
        );
    }

    private void validateNationalIdAndTelephone(UpdateUserRequest updateUserRequest, User user) {
        if (updateUserRequest.nationalId() != null
                && userRepository.existsByNationalIdAndIdNot(
                updateUserRequest.nationalId(), user.getId())) {

            throw new DuplicateUserException(
                    "Kayıtlı T.C. kimlik numarası."
            );
        }

        if (updateUserRequest.telephone() != null
                && userRepository.existsByTelephoneAndIdNot(
                updateUserRequest.telephone(), user.getId())) {

            throw new DuplicateUserException(
                    "Kayıtlı telefon numarası."
            );
        }
    }

    @Override
    public UserResponse createUser(CreateUserRequest createUserRequest) {
        return userMapper.toResponse(
                userRepository.save(
                        userMapper.toEntity(createUserRequest))
        );
    }

    @Override
    public Page<UserProfileResponse> getAllUsers(String search, Pageable pageable) {
        Page<UserResponse> users;

        if (search == null || search.isBlank()) {
            users = userRepository.findAll(pageable)
                    .map(userMapper::toResponse);
        } else {
            users = userRepository.searchUsers(search, pageable)
                    .map(userMapper::toResponse);
        }

        return toUserProfileResponsePage(users);
    }


    @Override
    public UserProfileResponse getMe() {
        User user = findUser(securityContextHelper.getCurrentUserId());
        AuthUserResponse authUserResponse = authFeign.getByUuid(user.getUuid());
        return toUserProfileResponse(
                userMapper.toResponse(user),
                authUserResponse
        );
    }

    @Override
    public UserProfileResponse updateUser(UpdateUserRequest updateUserRequest) {
        User user = findUser(securityContextHelper.getCurrentUserId());

        validateNationalIdAndTelephone(updateUserRequest, user);

        User updatedUser = userMapper.updateUser(user, updateUserRequest);

        userRepository.save(updatedUser);

        return new UserProfileResponse(
                userMapper.toResponse(updatedUser),
                authFeign.getByUuid(updatedUser.getUuid())
        );
    }


    @Override
    public UserProfileResponse changeUserStatus(UUID uuid) {

        User user = userRepository.findByUuid(uuid).orElseThrow(UserNotFoundException::new);
        AuthUserResponse authUserResponse = authFeign.getByUuid(user.getUuid());

        if (authUserResponse.role() == Role.ROOT)
            throw new RootIsImmutableException();
        if (authUserResponse.role() == Role.ADMIN)
            throw new AdminStatusChangeNotAllowedException();

        user.setActive(!user.isActive());
        User savedUser = userRepository.save(user);
        return toUserProfileResponse(
                userMapper.toResponse(savedUser),
                authUserResponse
        );
    }

    @Override
    public void deleteUser(UUID uuid) {
        User user = findUser(uuid);
        userRepository.delete(user);
    }

    @Override
    public UserProfileResponse getUserByEmail(String email) {
        AuthUserResponse authUserResponse = authFeign.getAuthUserByEmail(email);
        User user = findUser(authUserResponse.uuid());
        return toUserProfileResponse(
                userMapper.toResponse(user),
                authUserResponse
        );
    }

    @Override
    public Boolean isActive(UUID uuid) {
        User user = findUser(uuid);
        return user.isActive();
    }

    @Override
    public UserProfileResponse getUserByNationalId(String nationalId) {
        User user = userRepository.findByNationalId(nationalId).orElseThrow(UserNotFoundException::new);
        return toUserProfileResponse(
                userMapper.toResponse(user),
                authFeign.getByUuid(user.getUuid())
        );
    }

    @Override
    public UserProfileResponse getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByTelephone(phoneNumber).orElseThrow(UserNotFoundException::new);
        return toUserProfileResponse(
                userMapper.toResponse(user),
                authFeign.getByUuid(user.getUuid())
        );
    }

    @Override
    public UserProfileResponse getUserByUuid(UUID uuid) {
        User user = findUser(uuid);
        return toUserProfileResponse(userMapper.toResponse(user),
                authFeign.getByUuid(user.getUuid())
        );
    }

    @Override
    public UserProfileResponse updateUserByUUIDForAdmin(UUID uuid, UpdateUserRequest updateUserRequest) {
        User user = findUser(uuid);
        validateNationalIdAndTelephone(updateUserRequest, user);
        User updatedUser = userMapper.updateUser(user, updateUserRequest);
        User savedUser = userRepository.save(updatedUser);
        return toUserProfileResponse(
                userMapper.toResponse(savedUser),
                authFeign.getByUuid(user.getUuid())
        );
    }


}
