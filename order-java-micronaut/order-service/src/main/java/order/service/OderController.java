package order.service;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import order.introspected.SortingAndOrderArguments;

import java.util.List;

import io.micronaut.http.HttpStatus;
import javax.validation.Valid;

@Controller("/oder")
public class OderController {

    protected final OrderRepository orderRepository;

    public OderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Get("/")
    public HttpStatus index() {
        System.out.println("ok");
        return HttpStatus.OK;
    }

    @Get(value = "/list{?args*}")
    public List<OrderEntity> list(@Valid SortingAndOrderArguments args) {
        return orderRepository.findAll(args);
    }
};
