package com.example.swichatappserver.model.dto;

import java.util.List;

public record ChatDto(Long id, List<UserDto> participants) {}
