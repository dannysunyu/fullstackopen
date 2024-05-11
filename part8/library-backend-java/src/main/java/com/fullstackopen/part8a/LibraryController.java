package com.fullstackopen.part8a;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Controller
public class LibraryController {

    private static List<Author> authors = List.of(
        new Author("afa51ab0-344d-11e9-a414-719c6709cf3e", "Robert Martin", 1952),
        new Author("afa5b6f0-344d-11e9-a414-719c6709cf3e", "Martin Fowler", 1963),
        new Author("afa5b6f1-344d-11e9-a414-719c6709cf3e", "Fyodor Dostoevsky", 1821),
        new Author("afa5b6f2-344d-11e9-a414-719c6709cf3e", "Joshua Kerievsky", null),
        new Author("afa5b6f3-344d-11e9-a414-719c6709cf3e", "Sandi Metz", null)
    );

    private static List<Book> books = List.of(
        new Book(
            "Clean Code",
            2008,
            "Robert Martin",
            "afa5b6f4-344d-11e9-a414-719c6709cf3e",
            List.of("refactoring")
        ),
        new Book(
            "Agile software development",
            2008,
            "Robert Martin",
            "afa5b6f4-344d-11e9-a414-719c6709cf3e",
            List.of("refactoring")
        ),
        new Book(
            "Refactoring, edition 2",
            2018,
            "Martin Fowler",
            "afa5de00-344d-11e9-a414-719c6709cf3e",
            List.of("refactoring")
        ),
        new Book(
            "Refactoring to patterns",
            2008,
            "Joshua Kerievsky",
            "afa5de01-344d-11e9-a414-719c6709cf3e",
            List.of("refactoring", "patterns")
        ),
        new Book(
            "Practical Object-Oriented Design, An Agile Primer Using Ruby",
            2012,
            "Sandi Metz",
            "afa5de02-344d-11e9-a414-719c6709cf3e",
            List.of("refactoring", "design")
        ),
        new Book(
            "Crime and punishment",
            1866,
            "Fyodor Dostoevsky",
            "afa5de03-344d-11e9-a414-719c6709cf3e",
            List.of("classic", "crime")
        ),
        new Book(
            "Demons",
            1872,
            "Fyodor Dostoevsky",
            "afa5de04-344d-11e9-a414-719c6709cf3e",
            List.of("classic", "revolution")
        )
    );

    @QueryMapping
    public int dummy() {
        return 0;
    }

    @QueryMapping
    public Mono<Integer> bookCount() {
        return Mono.just(books.size());
    }

    @QueryMapping
    public Mono<Integer> authorCount() {
        return Mono.just(authors.size());
    }

    @QueryMapping
    public Flux<Book> allBooks() {
        return Flux.fromIterable(books);
    }

    @QueryMapping
    public Flux<Author> allAuthors() {
        return Flux.fromIterable(authors);
    }

    @SchemaMapping
    public Mono<Long> bookCount(Author author) {
        long count = books.stream().filter(book -> Objects.equals(book.author(), author.name())).count();
        return Mono.just(count);
    }

}
