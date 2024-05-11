package com.fullstackopen.part8a;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class Author {
    @Getter
    private String id;
    @Getter
    private String name;

    @Setter
    @Getter
    private Integer born;


}
