package com.hatirlabeni.productservice.dtos.categorygroup;

import jakarta.validation.constraints.Size;

public record CreateCategoryGroupRequest(
        @Size(min = 1, max = 255,message = "Grup isimleri 1 ile 50 karakter arası olabilir. ") String categoryGroupName
) {
}
