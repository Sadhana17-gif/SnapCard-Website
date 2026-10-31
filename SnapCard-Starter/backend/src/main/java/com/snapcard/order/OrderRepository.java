package com.snapcard.order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByEmailIgnoreCaseOrderByOrderDateDesc(String email);
    List<Order> findAllByOrderByOrderDateDesc();
}