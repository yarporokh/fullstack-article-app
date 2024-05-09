package com.example.myappapi;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {
    private final ArticleRepository repository;

    public List<Article> findAllArticles() {
        return repository.findAll();
    }

    public Article findArticleById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Article not found"));
    }

    public Article save(Article article) {
        return repository.save(article);
    }

    public void delete(Article article) {
        repository.delete(article);
    }
}
