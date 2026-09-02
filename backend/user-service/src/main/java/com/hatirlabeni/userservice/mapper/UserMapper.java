package com.hatirlabeni.userservice.mapper;

import com.hatirlabeni.userservice.dtos.CreateUserRequest;
import com.hatirlabeni.userservice.dtos.UpdateUserRequest;
import com.hatirlabeni.userservice.dtos.UserResponse;
import com.hatirlabeni.userservice.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(CreateUserRequest request);
    UserResponse toResponse(User user);

    @Mapping(target = "uuid",ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUser(@MappingTarget User user, UpdateUserRequest request);
}
