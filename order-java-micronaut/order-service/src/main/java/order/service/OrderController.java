package order.service;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import order.introspected.SortingAndOrderArguments;

import java.util.List;
import java.util.Optional;

import io.micronaut.http.HttpStatus;
import javax.validation.Valid;

@Controller("/order")
public class OrderController {

    protected final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Post("/")
    public OrderEntity index(@Body @Valid OrderEntity order) {
        System.out.println("ok2");
        return orderRepository.save(order.getName());
    }

    @Get("/{id}")
    public Optional<OrderEntity> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Get(value = "/{?args*}")
    public List<OrderEntity> list(@Valid SortingAndOrderArguments args) {
        return orderRepository.findAll(args);
    }
};
