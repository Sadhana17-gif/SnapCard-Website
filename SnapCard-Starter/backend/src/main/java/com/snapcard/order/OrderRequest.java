package com.snapcard.order;
import java.util.List;

public record OrderRequest(String customerName, String email, List<ItemRequest> items) {
    public record ItemRequest(Long productId, String name, Double price, Integer quantity,
                              String selectedSize, String imageUrl) {}
}