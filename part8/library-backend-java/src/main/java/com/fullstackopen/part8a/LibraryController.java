package com.fullstackopen.part8a;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Controller
public class LibraryController {
    private static List<Author> authors = new ArrayList<>();
    private static List<Book> books = new ArrayList<>();

    static {
        authors.add(new Author("afa51ab0-344d-11e9-a414-719c6709cf3e", "Robert Martin", 1952));
        authors.add(new Author("afa5b6f0-344d-11e9-a414-719c6709cf3e", "Martin Fowler", 1963));
        authors.add(new Author("afa5b6f1-344d-11e9-a414-719c6709cf3e", "Fyodor Dostoevsky", 1821));
        authors.add(new Author("afa5b6f2-344d-11e9-a414-719c6709cf3e", "Joshua Kerievsky", null));
        authors.add(new Author("afa5b6f3-344d-11e9-a414-719c6709cf3e", "Sandi Metz", null));

        books.add(new Book("Clean Code", 2008, "Robert Martin", "afa5b6f4-344d-11e9-a414-719c6709cf3e", List.of("refactoring")));
        books.add(new Book("Agile software development", 2008, "Robert Martin", "afa5b6f4-344d-11e9-a414-719c6709cf3e", List.of("refactoring")));
        books.add(new Book("Refactoring, edition 2", 2018, "Martin Fowler", "afa5de00-344d-11e9-a414-719c6709cf3e", List.of("refactoring")));
        books.add(new Book("Refactoring to patterns", 2008, "Joshua Kerievsky", "afa5de01-344d-11e9-a414-719c6709cf3e", List.of("refactoring", "patterns")));
        books.add(new Book("Practical Object-Oriented Design, An Agile Primer Using Ruby", 2012, "Sandi Metz", "afa5de02-344d-11e9-a414-719c6709cf3e", List.of("refactoring", "design")));
        books.add(new Book("Crime and punishment", 1866, "Fyodor Dostoevsky", "afa5de03-344d-11e9-a414-719c6709cf3e", List.of("classic", "crime")));
        books.add(new Book("Demons", 1872, "Fyodor Dostoevsky", "afa5de04-344d-11e9-a414-719c6709cf3e", List.of("classic", "revolution")));
    }

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
    public Flux<Book> allBooks(@Argument String author, @Argument String genre) {
        var allBooks = books;

        if (author != null) {
            allBooks = allBooks.stream().filter(book -> book.author().equals(author)).toList();
        }

        if (genre != null) {
            allBooks = allBooks.stream().filter(book -> book.genres().contains(genre)).toList();
        }
        return Flux.fromIterable(allBooks);
    }

    @QueryMapping
    public Flux<Author> allAuthors() {
        return Flux.fromIterable(authors);
    }

    @SchemaMapping
    public Mono<Long> bookCount(Author author) {
        long count = books.stream().filter(book -> Objects.equals(book.author(), author.getName())).count();
        return Mono.just(count);
    }

    @MutationMapping
    Mono<Book> addBook(
        @Argument String title,
        @Argument String author,
        @Argument Integer published,
        @Argument List<String> genres
    ) {
        if (books.stream().noneMatch(book -> book.title().equals(title))) {
            return Mono.empty();
        }

        var book = new Book(title, published, author, UUID.randomUUID().toString(), genres);
        books.add(book);

        if (authors.stream().noneMatch(existingAuthor -> existingAuthor.getName().equals(author))) {
            authors.add(new Author(UUID.randomUUID().toString(), author, null));
        }

        return Mono.just(book);
    }

    @MutationMapping
    Mono<Author> editAuthor(
        @Argument String name,
        @Argument int setBornTo
    ) {
        for (Author author : authors) {
            if (author.getName().equals(name)) {
                author.setBorn(setBornTo);
                return Mono.just(author);
            }
        }

        return Mono.empty();
    }

}
