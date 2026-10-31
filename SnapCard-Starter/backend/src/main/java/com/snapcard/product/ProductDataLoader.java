package com.snapcard.product;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProductDataLoader {

    @Bean
    CommandLineRunner loadFashionProducts(ProductRepository repository) {
        return args -> {

            if (repository.count() > 4) {
                System.out.println("Fashion products already loaded.");
                return;
            }

            repository.save(create("Everyday Linen Shirt", "Women", 699, 999,
                    "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85", "BESTSELLER", 4.8));

            repository.save(create("Classic Oversized Tee", "Men", 449, 699,
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", "TRENDING", 4.7));

            repository.save(create("Soft Pastel Kurta Set", "Ethnic", 1199, 1699,
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85", "NEW", 4.9));

            repository.save(create("Everyday Shoulder Bag", "Accessories", 599, 899,
                    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", "JUST IN", 4.6));

            repository.save(create("Weekend Denim Jacket", "Women", 1299, 1899,
                    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85", "POPULAR", 4.8));

            repository.save(create("Minimal Everyday Sneakers", "Men", 999, 1499,
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", "VALUE PICK", 4.7));

            repository.save(create("Gold Tone Hoop Earrings", "Accessories", 249, 399,
                    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85", "UNDER ₹299", 4.5));

            repository.save(create("Floral Day Dress", "Women", 899, 1299,
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85", "NEW", 4.8));

            repository.save(create("Casual Crop Top", "Women", 399, 599,
                    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85", "POPULAR", 4.6));

            repository.save(create("Cotton Daily Kurti", "Women", 599, 899,
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85", "BESTSELLER", 4.7));

            repository.save(create("Wide Leg Denim Jeans", "Women", 899, 1299,
                    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85", "TRENDING", 4.8));

            repository.save(create("Elegant Maxi Dress", "Women", 1099, 1599,
                    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85", "NEW", 4.9));

            repository.save(create("Classic Polo T-Shirt", "Men", 499, 749,
                    "https://images.unsplash.com/photo-1625910513413-5fc45e5f9a5c?auto=format&fit=crop&w=900&q=85", "POPULAR", 4.6));

            repository.save(create("Smart Casual Shirt", "Men", 749, 1099,
                    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85", "BESTSELLER", 4.8));

            repository.save(create("Everyday Jogger Pants", "Men", 699, 999,
                    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85", "VALUE PICK", 4.5));

            repository.save(create("Comfort Hoodie", "Men", 899, 1299,
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", "TRENDING", 4.7));

            repository.save(create("Printed Anarkali Kurti", "Ethnic", 899, 1299,
                    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85", "POPULAR", 4.8));

            repository.save(create("Festive Salwar Set", "Ethnic", 1499, 1999,
                    "https://images.unsplash.com/photo-1583391733981-849840e3f5e8?auto=format&fit=crop&w=900&q=85", "NEW", 4.9));

            repository.save(create("Classic Cotton Kurta", "Ethnic", 649, 949,
                    "https://images.unsplash.com/photo-1597983073493-88cd35cf93e6?auto=format&fit=crop&w=900&q=85", "BESTSELLER", 4.7));

            repository.save(create("Chic Sling Bag", "Accessories", 499, 749,
                    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85", "TRENDING", 4.6));

            repository.save(create("Classic Sunglasses", "Accessories", 299, 499,
                    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", "UNDER ₹299", 4.5));

            repository.save(create("Elegant Pendant Necklace", "Accessories", 349, 549,
                    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85", "NEW", 4.7));

            repository.save(create("Minimal Bracelet", "Accessories", 199, 299,
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85", "UNDER ₹299", 4.5));

            repository.save(create("Everyday Wallet", "Accessories", 399, 599,
                    "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85", "VALUE PICK", 4.6));

            System.out.println("Fashion products loaded successfully.");
        };
    }

    private Product create(String name, String category, double price,
                           double oldPrice, String imageUrl, String tag,
                           double rating) {
        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setPrice(price);
        product.setOldPrice(oldPrice);
        product.setImageUrl(imageUrl);
        product.setTag(tag);
        product.setRating(rating);
        return product;
    }
}
