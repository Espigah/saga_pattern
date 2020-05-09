package order.service.message_broker;


import io.micronaut.configuration.kafka.annotation.*;

@KafkaListener(offsetReset = OffsetReset.EARLIEST) 
public class OrderBilledConsumer {

    @Topic("ORDER_BILLED_EVENT") 
    public void receive(@KafkaKey String brand, String name) { 
        System.out.println("Got Product - " + name + " by " + brand);
    }
}