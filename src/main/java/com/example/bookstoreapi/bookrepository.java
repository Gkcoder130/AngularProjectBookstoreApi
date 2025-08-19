package com.example.bookstoreapi;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface bookrepository extends JpaRepository<book, Long> {
    List<book> findByTitleContainingIgnoreCase(String title);
    List<book> findByAuthorContainingIgnoreCase(String author);
}