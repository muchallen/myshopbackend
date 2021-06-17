package com.muchallen.shop.repo;

import com.muchallen.shop.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Long> {
    Optional<Product> getProductById(Long id);

    void deleteProductById(Long id);
}
