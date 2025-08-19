package com.example.bookstoreapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bookservice {

    @Autowired 
    private bookrepository repository;

    public List<book> getAllBooks() {
        return repository.findAll();
    }

    public book saveBook(book b) {
        return repository.save(b);
    }
    
    public void deleteBook(Long id) {
        repository.deleteById(id);
    }
    public book updatebook(book b) {
        book existing = repository.findById(b.getId()).orElse(null);
        if (existing != null) {
            existing.setTitle(b.getTitle());
            existing.setAuthor(b.getAuthor());
            existing.setPrice(b.getPrice());
            existing.setStock(b.getStock());
            return repository.save(existing);
        }
        return null;
    }
    public List<book> searchByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }
    public List<book> searchByAuthor(String author) {
        return repository.findByAuthorContainingIgnoreCase(author);
    }
}