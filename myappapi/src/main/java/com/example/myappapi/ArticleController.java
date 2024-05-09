package com.example.myappapi;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/articles")
public class ArticleController {
    private final ArticleService service;

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        return ResponseEntity.ok(service.findAllArticles());
    }

    @GetMapping("{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.findArticleById(id));
    }

    @PostMapping
    public ResponseEntity<Article> addNewArticle(@RequestBody Article article) {
        return ResponseEntity.ok(service.save(article));
    }

    @PutMapping
    public void editArticle(@RequestBody Article article) {
        service.save(article);
    }

    @DeleteMapping
    public void deleteArticle(@RequestBody Article article) {
        service.delete(article);
    }
}
