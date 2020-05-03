package order.service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import order.introspected.SortingAndOrderArguments;

import java.util.List;
import java.util.Optional;


public interface OrderRepository {

    Optional<OrderEntity> findById(@NotNull Long id);

    OrderEntity save(@NotBlank String name);

    void deleteById(@NotNull Long id);

    List<OrderEntity> findAll(@NotNull SortingAndOrderArguments args);

    int update(@NotNull Long id, @NotBlank String name);
}