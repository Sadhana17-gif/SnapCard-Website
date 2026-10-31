package com.snapcard.auth;

import java.util.Map;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private final AppUserRepository users;

    public AuthController(AppUserRepository users) {
        this.users = users;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody AuthRequest request) {
        String name = clean(request.name());
        String email = clean(request.email()).toLowerCase();
        String password = request.password() == null ? "" : request.password();

        if (name.isBlank() || name.length() > 100) return error(HttpStatus.BAD_REQUEST, "Please enter a valid name.");
        if (!EMAIL_PATTERN.matcher(email).matches() || email.length() > 190) return error(HttpStatus.BAD_REQUEST, "Please enter a valid email address.");
        if (password.length() < 8) return error(HttpStatus.BAD_REQUEST, "Password must be at least 8 characters.");
        System.out.println("SIGNUP EMAIL: " + email);
        if (users.existsByEmailIgnoreCase(email)) return error(HttpStatus.CONFLICT, "This email is already registered. Please log in.");

        AppUser saved = users.save(new AppUser(name, email, PasswordHasher.hash(password)));
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Account created successfully.", "name", saved.getName(), "email", saved.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest request) {
        String email = clean(request.email()).toLowerCase();
        String password = request.password() == null ? "" : request.password();
        AppUser user = users.findByEmailIgnoreCase(email).orElse(null);
        if (user == null || !PasswordHasher.matches(password, user.getPasswordHash())) {
            return error(HttpStatus.UNAUTHORIZED, "Email or password is incorrect.");
        }
        return ResponseEntity.ok(Map.of("message", "Login successful.", "name", user.getName(), "email", user.getEmail()));
    }

    private static String clean(String value) {
        return value == null ? "" : value.trim();
    }

    private static ResponseEntity<Map<String, String>> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(Map.of("message", message));
    }

    public record AuthRequest(String name, String email, String password) {}
}
