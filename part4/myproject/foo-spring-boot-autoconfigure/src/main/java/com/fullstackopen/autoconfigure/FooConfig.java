package com.fullstackopen.autoconfigure;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FooConfig {

    @Bean
    Foo myFoo() {
        return new Foo();
    }
}
