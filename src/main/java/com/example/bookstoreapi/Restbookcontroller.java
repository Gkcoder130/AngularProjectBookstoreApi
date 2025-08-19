package com.example.bookstoreapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController 
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/books") 
public class Restbookcontroller {

    @Autowired 
    private bookservice service;

    @GetMapping
    public List<book> getBooks() {
        return service.getAllBooks();
    }
    @GetMapping("/search/title/{title}")
    public List<book> searchByTitle(@PathVariable String title) {
        return service.searchByTitle(title);
    }

    @GetMapping("/search/author/{author}")
    public List<book> searchByAuthor(@PathVariable String author) {
        return service.searchByAuthor(author);
    }
    @PostMapping
    public book addBook(@RequestBody book b) {
        return service.saveBook(b);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }
    @PutMapping("/{id}")
    public book updatebook(@PathVariable Long id, @RequestBody book b) {
        b.setId(id);
        return service.updatebook(b);
    }
}