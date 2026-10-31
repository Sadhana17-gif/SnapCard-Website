package com.snapcard.order;
import java.time.format.DateTimeFormatter;
import java.util.List;

public record OrderResponse(String id, String date, String customer, String email,
                            String status, double total, List<Item> items) {
    public record Item(Long id, String name, double price, int qty,
                       String selectedSize, String imageUrl) {}

    public static OrderResponse from(Order order) {
        String displayId = "SC" + order.getId();
        String date = order.getOrderDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));
        List<Item> items = order.getItems().stream()
            .map(i -> new Item(i.getProductId() != null ? i.getProductId() : i.getId(),
                i.getName(), i.getPrice(), i.getQuantity(), i.getSelectedSize(), i.getImageUrl()))
            .toList();
        return new OrderResponse(displayId, date, order.getCustomerName(), order.getEmail(),
            order.getStatus(), order.getTotal(), items);
    }
}