package com.fullstackopen.part8a;

import java.util.List;

public record Book(String title, int published, String author, String id, List<String> genres) {
}
