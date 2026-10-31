package com.snapcard.order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class OrderController {
    private final OrderRepository repository;

    public OrderController(OrderRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        if (request.items() == null || request.items().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Your cart is empty."));
        }

        Order order = new Order();
        String name = request.customerName() == null ? "Guest" : request.customerName().trim();
        String email = request.email() == null ? "" : request.email().trim().toLowerCase();
        order.setCustomerName(name.isBlank() ? "Guest" : name);
        order.setEmail(email.isBlank() ? null : email);
        double total = 0;

        for (OrderRequest.ItemRequest input : request.items()) {
            if (input.name() == null || input.name().isBlank()
                    || input.price() == null || input.price() < 0
                    || input.quantity() == null || input.quantity() < 1) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid order item."));
            }
            OrderItem item = new OrderItem();
            item.setProductId(input.productId());
            item.setName(input.name().trim());
            item.setPrice(input.price());
            item.setQuantity(input.quantity());
            item.setSelectedSize(input.selectedSize());
            item.setImageUrl(input.imageUrl());
            order.addItem(item);
            total += input.price() * input.quantity();
        }

        order.setTotal(Math.round(total * 100.0) / 100.0);
        Order saved = repository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(OrderResponse.from(saved));
    }

    @GetMapping
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrders(@RequestParam(required = false) String email) {
        List<Order> orders = email == null || email.isBlank()
            ? repository.findAllByOrderByOrderDateDesc()
            : repository.findByEmailIgnoreCaseOrderByOrderDateDesc(email.trim());
        return orders.stream().map(OrderResponse::from).toList();
    }
}