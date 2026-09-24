package com.hatirlabeni.userservice.service.impl;

import com.hatirlabeni.userservice.dtos.feign.AuthUserResponse;
import com.hatirlabeni.userservice.dtos.user.CreateUserRequest;
import com.hatirlabeni.userservice.dtos.user.UpdateUserRequest;
import com.hatirlabeni.userservice.dtos.user.UserProfileResponse;
import com.hatirlabeni.userservice.dtos.user.UserResponse;
import com.hatirlabeni.userservice.entity.User;
import com.hatirlabeni.userservice.enums.Role;
import com.hatirlabeni.userservice.exception.admin.AdminStatusChangeNotAllowedException;
import com.hatirlabeni.userservice.exception.admin.RootIsImmutableException;
import com.hatirlabeni.userservice.exception.user.DuplicateUserException;
import com.hatirlabeni.userservice.exception.user.UserNotFoundException;
import com.hatirlabeni.userservice.feign.AuthFeign;
import com.hatirlabeni.userservice.mapper.UserMapper;
import com.hatirlabeni.userservice.repository.UserRepository;
import com.hatirlabeni.userservice.security.SecurityContextHelper;
import com.hatirlabeni.userservice.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final AuthFeign authFeign;
    private final SecurityContextHelper securityContextHelper;

    // Kullanıcı oluşturma

    @Override
    public UserResponse createUser(CreateUserRequest createUserRequest) {
        User user = userMapper.toEntity(createUserRequest);

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    @Override
    public void createRoot(CreateUserRequest createUserRequest) {
        Optional<User> optionalUser =
                userRepository.findByNationalId(createUserRequest.nationalId());

        if (optionalUser.isEmpty()) {
            createUser(createUserRequest);
        }
    }

    // Kullanıcı profil işlemleri

    @Override
    public UserProfileResponse getMe() {
        User user = findUser(securityContextHelper.getCurrentUserId());

        return toUserProfileResponse(user);
    }

    @Override
    public UserProfileResponse updateUser(UpdateUserRequest updateUserRequest) {
        User user = findUser(securityContextHelper.getCurrentUserId());

        validateNationalIdAndTelephone(updateUserRequest, user);

        User updatedUser = userMapper.updateUser(user, updateUserRequest);
        User savedUser = userRepository.save(updatedUser);

        return toUserProfileResponse(savedUser);
    }

    // Kullanıcı listeleme ve arama

    @Override
    public Page<UserProfileResponse> getAllUsers(
            String search,
            Pageable pageable
    ) {
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

    // Kullanıcı bilgilerine göre arama

    @Override
    public UserProfileResponse getUserByUuid(UUID uuid) {
        return toUserProfileResponse(findUser(uuid));
    }

    @Override
    public UserProfileResponse getUserByEmail(String email) {
        AuthUserResponse authUserResponse =
                authFeign.getAuthUserByEmail(email);

        User user = findUser(authUserResponse.uuid());

        return toUserProfileResponse(user, authUserResponse);
    }

    @Override
    public UserProfileResponse getUserByNationalId(String nationalId) {
        User user = userRepository.findByNationalId(nationalId)
                .orElseThrow(UserNotFoundException::new);

        return toUserProfileResponse(user);
    }

    @Override
    public UserProfileResponse getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByTelephone(phoneNumber)
                .orElseThrow(UserNotFoundException::new);

        return toUserProfileResponse(user);
    }

    // Admin kullanıcı işlemleri

    @Override
    public UserProfileResponse updateUserByUUIDForAdmin(
            UUID uuid,
            UpdateUserRequest updateUserRequest
    ) {
        User user = findUser(uuid);

        validateNationalIdAndTelephone(updateUserRequest, user);

        User updatedUser = userMapper.updateUser(user, updateUserRequest);
        User savedUser = userRepository.save(updatedUser);

        return toUserProfileResponse(savedUser);
    }

    @Override
    public UserProfileResponse changeUserStatus(UUID uuid) {
        User user = findUser(uuid);

        AuthUserResponse authUserResponse =
                authFeign.getByUuid(user.getUuid());

        validateUserStatusChange(authUserResponse.role());

        user.setActive(!user.isActive());

        User savedUser = userRepository.save(user);

        return toUserProfileResponse(savedUser, authUserResponse);
    }

    @Override
    public void deleteUser(UUID uuid) {
        User user = findUser(uuid);

        userRepository.delete(user);
    }

    // Hesap ve mail aktivasyon işlemleri

    @Override
    public Boolean isActive(UUID uuid) {
        User user = findUser(uuid);

        return user.isActive();
    }

    @Override
    public void mailActivation(UUID uuid) {
        User user = findUser(uuid);

        user.setMailActivation(true);

        userRepository.save(user);
    }

    @Override
    public Boolean mailIsActive(UUID uuid) {
        User user = findUser(uuid);

        return user.isMailActivation();
    }

    // Yardımcı metotlar

    private User findUser(UUID uuid) {
        return userRepository.findByUuid(uuid)
                .orElseThrow(UserNotFoundException::new);
    }

    private UserProfileResponse toUserProfileResponse(User user) {
        AuthUserResponse authUserResponse =
                authFeign.getByUuid(user.getUuid());

        return toUserProfileResponse(user, authUserResponse);
    }

    private UserProfileResponse toUserProfileResponse(
            User user,
            AuthUserResponse authUserResponse
    ) {
        return new UserProfileResponse(
                userMapper.toResponse(user),
                authUserResponse
        );
    }

    private Page<UserProfileResponse> toUserProfileResponsePage(
            Page<UserResponse> userResponses
    ) {
        return userResponses.map(user ->
                new UserProfileResponse(
                        user,
                        authFeign.getByUuid(user.uuid())
                )
        );
    }

    private void validateNationalIdAndTelephone(
            UpdateUserRequest updateUserRequest,
            User user
    ) {
        if (updateUserRequest.nationalId() != null
                && userRepository.existsByNationalIdAndIdNot(
                updateUserRequest.nationalId(),
                user.getId()
        )) {

            throw new DuplicateUserException(
                    "Kayıtlı T.C. kimlik numarası."
            );
        }

        if (updateUserRequest.telephone() != null
                && userRepository.existsByTelephoneAndIdNot(
                updateUserRequest.telephone(),
                user.getId()
        )) {

            throw new DuplicateUserException(
                    "Kayıtlı telefon numarası."
            );
        }
    }

    private void validateUserStatusChange(Role role) {
        if (role == Role.ROOT) {
            throw new RootIsImmutableException();
        }

        if (role == Role.ADMIN) {
            throw new AdminStatusChangeNotAllowedException();
        }
    }
}