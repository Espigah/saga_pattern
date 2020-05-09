package order.service.message_broker;
import io.micronaut.configuration.kafka.annotation.*;

@KafkaClient 
public interface ProductClient {

    @Topic("my-products") 
    void sendProduct(@KafkaKey String brand, String name); 

    void sendProduct(@Topic String topic, @KafkaKey String brand, String name); 
}