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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private AuthFeign authFeign;

    @Mock
    private SecurityContextHelper securityContextHelper;

    @InjectMocks
    private UserServiceImpl userService;


    // =========================
    // createUser
    // =========================

    @Test
    void createUser_shouldCreateUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        CreateUserRequest request = new CreateUserRequest(
                uuid,
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        User user = mock(User.class);

        UserResponse userResponse = createUserResponse(uuid);

        when(userMapper.toEntity(request))
                .thenReturn(user);

        when(userRepository.save(user))
                .thenReturn(user);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        UserResponse response = userService.createUser(request);

        assertNotNull(response);
        assertEquals(userResponse, response);

        verify(userMapper).toEntity(request);
        verify(userRepository).save(user);
        verify(userMapper).toResponse(user);
    }


    // =========================
    // getAllUsers
    // =========================

    @Test
    void getAllUsers_shouldReturnAllUsersWhenSearchIsBlank() {

        Pageable pageable = PageRequest.of(0, 10);

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);
        UserResponse userResponse = createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        Page<User> userPage =
                new PageImpl<>(List.of(user));

        when(userRepository.findAll(pageable))
                .thenReturn(userPage);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        Page<UserProfileResponse> response =
                userService.getAllUsers("", pageable);

        assertNotNull(response);
        assertEquals(1, response.getTotalElements());
        assertEquals(
                userResponse,
                response.getContent().get(0).user()
        );
        assertEquals(
                authUserResponse,
                response.getContent().get(0).auth()
        );

        verify(userRepository).findAll(pageable);
        verify(userMapper).toResponse(user);
        verify(authFeign).getByUuid(uuid);

        verify(userRepository, never())
                .searchUsers(anyString(), any(Pageable.class));
    }


    @Test
    void getAllUsers_shouldSearchUsersWhenSearchIsProvided() {

        Pageable pageable = PageRequest.of(0, 10);

        String search = "Salih";

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);
        UserResponse userResponse = createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        Page<User> userPage =
                new PageImpl<>(List.of(user));

        when(userRepository.searchUsers(search, pageable))
                .thenReturn(userPage);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        Page<UserProfileResponse> response =
                userService.getAllUsers(search, pageable);

        assertNotNull(response);
        assertEquals(1, response.getTotalElements());

        assertEquals(
                userResponse,
                response.getContent().get(0).user()
        );

        assertEquals(
                authUserResponse,
                response.getContent().get(0).auth()
        );

        verify(userRepository)
                .searchUsers(search, pageable);

        verify(userMapper)
                .toResponse(user);

        verify(authFeign)
                .getByUuid(uuid);

        verify(userRepository, never())
                .findAll(any(Pageable.class));
    }


    // =========================
    // getMe
    // =========================

    @Test
    void getMe_shouldReturnCurrentUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        UserResponse userResponse = createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.getMe();

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(securityContextHelper)
                .getCurrentUserId();

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper)
                .toResponse(user);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void getMe_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.getMe()
        );

        verify(securityContextHelper)
                .getCurrentUserId();

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper, never())
                .toResponse(any(User.class));

        verify(authFeign, never())
                .getByUuid(any(UUID.class));
    }


    // =========================
    // updateUser
    // =========================

    @Test
    void updateUser_shouldUpdateCurrentUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                "Mehmet",
                "Baştug",
                null,
                null,
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        User user = mock(User.class);
        User updatedUser = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(userMapper.updateUser(user, request))
                .thenReturn(updatedUser);

        when(updatedUser.getUuid())
                .thenReturn(uuid);

        when(userRepository.save(updatedUser))
                .thenReturn(updatedUser);

        when(userMapper.toResponse(updatedUser))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.updateUser(request);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(securityContextHelper)
                .getCurrentUserId();

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper)
                .updateUser(user, request);

        verify(userRepository)
                .save(updatedUser);

        verify(userMapper)
                .toResponse(updatedUser);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void updateUser_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                "Mehmet",
                "Baştug",
                null,
                null,
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.updateUser(request)
        );

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void updateUser_shouldThrowDuplicateUserExceptionWhenNationalIdAlreadyExists() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                null,
                null,
                "12345678901",
                null,
                null,
                null,
                null
        );

        User user = mock(User.class);

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getId())
                .thenReturn(1L);

        when(userRepository.existsByNationalIdAndIdNot(
                request.nationalId(),
                1L
        )).thenReturn(true);

        assertThrows(
                DuplicateUserException.class,
                () -> userService.updateUser(request)
        );

        verify(userRepository)
                .existsByNationalIdAndIdNot(
                        request.nationalId(),
                        1L
                );

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void updateUser_shouldThrowDuplicateUserExceptionWhenTelephoneAlreadyExists() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                null,
                null,
                null,
                "05551234567",
                null,
                null,
                null
        );

        User user = mock(User.class);

        when(securityContextHelper.getCurrentUserId())
                .thenReturn(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getId())
                .thenReturn(1L);

        when(userRepository.existsByTelephoneAndIdNot(
                request.telephone(),
                1L
        )).thenReturn(true);

        assertThrows(
                DuplicateUserException.class,
                () -> userService.updateUser(request)
        );

        verify(userRepository)
                .existsByTelephoneAndIdNot(
                        request.telephone(),
                        1L
                );

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    // =========================
    // changeUserStatus
    // =========================

    @Test
    void changeUserStatus_shouldToggleUserStatusSuccessfully() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);
        User savedUser = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                new AuthUserResponse(
                        uuid,
                        "salih",
                        "salih@example.com",
                        Role.USER
                );

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(user.isActive())
                .thenReturn(true);

        when(userRepository.save(user))
                .thenReturn(savedUser);

        when(userMapper.toResponse(savedUser))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.changeUserStatus(uuid);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(userRepository)
                .findByUuid(uuid);

        verify(authFeign)
                .getByUuid(uuid);

        verify(user)
                .setActive(false);

        verify(userRepository)
                .save(user);

        verify(userMapper)
                .toResponse(savedUser);
    }


    @Test
    void changeUserStatus_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.changeUserStatus(uuid)
        );

        verify(userRepository)
                .findByUuid(uuid);

        verify(authFeign, never())
                .getByUuid(any(UUID.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void changeUserStatus_shouldThrowRootIsImmutableExceptionWhenUserIsRoot() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        AuthUserResponse authUserResponse =
                new AuthUserResponse(
                        uuid,
                        "root",
                        "root@example.com",
                        Role.ROOT
                );

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        assertThrows(
                RootIsImmutableException.class,
                () -> userService.changeUserStatus(uuid)
        );

        verify(authFeign)
                .getByUuid(uuid);

        verify(user, never())
                .setActive(anyBoolean());

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void changeUserStatus_shouldThrowAdminStatusChangeNotAllowedExceptionWhenUserIsAdmin() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        AuthUserResponse authUserResponse =
                new AuthUserResponse(
                        uuid,
                        "admin",
                        "admin@example.com",
                        Role.ADMIN
                );

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        assertThrows(
                AdminStatusChangeNotAllowedException.class,
                () -> userService.changeUserStatus(uuid)
        );

        verify(authFeign)
                .getByUuid(uuid);

        verify(user, never())
                .setActive(anyBoolean());

        verify(userRepository, never())
                .save(any(User.class));
    }


    // =========================
    // deleteUser
    // =========================

    @Test
    void deleteUser_shouldDeleteUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        userService.deleteUser(uuid);

        verify(userRepository)
                .findByUuid(uuid);

        verify(userRepository)
                .delete(user);
    }


    @Test
    void deleteUser_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.deleteUser(uuid)
        );

        verify(userRepository)
                .findByUuid(uuid);

        verify(userRepository, never())
                .delete(any(User.class));
    }


    // =========================
    // getUserByEmail
    // =========================

    @Test
    void getUserByEmail_shouldReturnUserSuccessfully() {

        String email = "salih@example.com";
        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        UserResponse userResponse =
                createUserResponse(uuid);

        when(authFeign.getAuthUserByEmail(email))
                .thenReturn(authUserResponse);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));


        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        UserProfileResponse response =
                userService.getUserByEmail(email);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(authFeign)
                .getAuthUserByEmail(email);

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper)
                .toResponse(user);
    }


    @Test
    void getUserByEmail_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        String email = "salih@example.com";
        UUID uuid = UUID.randomUUID();

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(authFeign.getAuthUserByEmail(email))
                .thenReturn(authUserResponse);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.getUserByEmail(email)
        );

        verify(authFeign)
                .getAuthUserByEmail(email);

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper, never())
                .toResponse(any(User.class));
    }


    // =========================
    // isActive
    // =========================

    @Test
    void isActive_shouldReturnTrueWhenUserIsActive() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.isActive())
                .thenReturn(true);

        Boolean result = userService.isActive(uuid);

        assertTrue(result);

        verify(userRepository)
                .findByUuid(uuid);

        verify(user)
                .isActive();
    }


    @Test
    void isActive_shouldReturnFalseWhenUserIsInactive() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.isActive())
                .thenReturn(false);

        Boolean result = userService.isActive(uuid);

        assertFalse(result);

        verify(userRepository)
                .findByUuid(uuid);

        verify(user)
                .isActive();
    }


    // =========================
    // getUserByNationalId
    // =========================

    @Test
    void getUserByNationalId_shouldReturnUserSuccessfully() {

        String nationalId = "12345678901";
        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(userRepository.findByNationalId(nationalId))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.getUserByNationalId(nationalId);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(userRepository)
                .findByNationalId(nationalId);

        verify(userMapper)
                .toResponse(user);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void getUserByNationalId_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        String nationalId = "12345678901";

        when(userRepository.findByNationalId(nationalId))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.getUserByNationalId(nationalId)
        );

        verify(userRepository)
                .findByNationalId(nationalId);

        verify(userMapper, never())
                .toResponse(any(User.class));

        verify(authFeign, never())
                .getByUuid(any(UUID.class));
    }


    // =========================
    // getUserByPhoneNumber
    // =========================

    @Test
    void getUserByPhoneNumber_shouldReturnUserSuccessfully() {

        String phoneNumber = "05551234567";
        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(userRepository.findByTelephone(phoneNumber))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.getUserByPhoneNumber(phoneNumber);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(userRepository)
                .findByTelephone(phoneNumber);

        verify(userMapper)
                .toResponse(user);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void getUserByPhoneNumber_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        String phoneNumber = "05551234567";

        when(userRepository.findByTelephone(phoneNumber))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.getUserByPhoneNumber(phoneNumber)
        );

        verify(userRepository)
                .findByTelephone(phoneNumber);

        verify(userMapper, never())
                .toResponse(any(User.class));

        verify(authFeign, never())
                .getByUuid(any(UUID.class));
    }


    // =========================
    // getUserByUuid
    // =========================

    @Test
    void getUserByUuid_shouldReturnUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        User user = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getUuid())
                .thenReturn(uuid);

        when(userMapper.toResponse(user))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.getUserByUuid(uuid);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper)
                .toResponse(user);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void getUserByUuid_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.getUserByUuid(uuid)
        );

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper, never())
                .toResponse(any(User.class));

        verify(authFeign, never())
                .getByUuid(any(UUID.class));
    }


    // =========================
    // updateUserByUUIDForAdmin
    // =========================

    @Test
    void updateUserByUUIDForAdmin_shouldUpdateUserSuccessfully() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                "Mehmet",
                "Baştug",
                null,
                null,
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        User user = mock(User.class);
        User updatedUser = mock(User.class);
        User savedUser = mock(User.class);

        UserResponse userResponse =
                createUserResponse(uuid);

        AuthUserResponse authUserResponse =
                createAuthUserResponse(uuid);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(userMapper.updateUser(user, request))
                .thenReturn(updatedUser);

        when(userRepository.save(updatedUser))
                .thenReturn(savedUser);

        when(user.getUuid())
                .thenReturn(uuid);

        when(userMapper.toResponse(savedUser))
                .thenReturn(userResponse);

        when(authFeign.getByUuid(uuid))
                .thenReturn(authUserResponse);

        UserProfileResponse response =
                userService.updateUserByUUIDForAdmin(uuid, request);

        assertNotNull(response);
        assertEquals(userResponse, response.user());
        assertEquals(authUserResponse, response.auth());

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper)
                .updateUser(user, request);

        verify(userRepository)
                .save(updatedUser);

        verify(userMapper)
                .toResponse(savedUser);

        verify(authFeign)
                .getByUuid(uuid);
    }


    @Test
    void updateUserByUUIDForAdmin_shouldThrowUserNotFoundExceptionWhenUserDoesNotExist() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                "Mehmet",
                "Baştug",
                null,
                null,
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1)
        );

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.updateUserByUUIDForAdmin(uuid, request)
        );

        verify(userRepository)
                .findByUuid(uuid);

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void updateUserByUUIDForAdmin_shouldThrowDuplicateUserExceptionWhenNationalIdAlreadyExists() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                null,
                null,
                "12345678901",
                null,
                null,
                null,
                null
        );

        User user = mock(User.class);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getId())
                .thenReturn(1L);

        when(userRepository.existsByNationalIdAndIdNot(
                request.nationalId(),
                1L
        )).thenReturn(true);

        assertThrows(
                DuplicateUserException.class,
                () -> userService.updateUserByUUIDForAdmin(uuid, request)
        );

        verify(userRepository)
                .existsByNationalIdAndIdNot(
                        request.nationalId(),
                        1L
                );

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    @Test
    void updateUserByUUIDForAdmin_shouldThrowDuplicateUserExceptionWhenTelephoneAlreadyExists() {

        UUID uuid = UUID.randomUUID();

        UpdateUserRequest request = new UpdateUserRequest(
                null,
                null,
                null,
                "05551234567",
                null,
                null,
                null
        );

        User user = mock(User.class);

        when(userRepository.findByUuid(uuid))
                .thenReturn(Optional.of(user));

        when(user.getId())
                .thenReturn(1L);

        when(userRepository.existsByTelephoneAndIdNot(
                request.telephone(),
                1L
        )).thenReturn(true);

        assertThrows(
                DuplicateUserException.class,
                () -> userService.updateUserByUUIDForAdmin(uuid, request)
        );

        verify(userRepository)
                .existsByTelephoneAndIdNot(
                        request.telephone(),
                        1L
                );

        verify(userMapper, never())
                .updateUser(any(User.class), any(UpdateUserRequest.class));

        verify(userRepository, never())
                .save(any(User.class));
    }


    // =========================
    // Test helpers
    // =========================

    private UserResponse createUserResponse(UUID uuid) {

        return new UserResponse(
                1L,
                uuid,
                "Salih",
                "Baştug",
                "12345678901",
                "05551234567",
                "Adana",
                "Seyhan",
                LocalDate.of(1998, 4, 1),
                true,
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }


    private AuthUserResponse createAuthUserResponse(UUID uuid) {

        return new AuthUserResponse(
                uuid,
                "salih",
                "salih@example.com",
                Role.USER
        );
    }
}