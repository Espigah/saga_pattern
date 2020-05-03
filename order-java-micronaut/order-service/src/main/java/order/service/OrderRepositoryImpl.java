package order.service;

import io.micronaut.configuration.hibernate.jpa.scope.CurrentSession;
import io.micronaut.runtime.ApplicationConfiguration;
import io.micronaut.spring.tx.annotation.Transactional;
import order.introspected.SortingAndOrderArguments;
import order.service.OrderEntity;

import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Singleton
public class OrderRepositoryImpl implements OrderRepository {

    @PersistenceContext
    private EntityManager entityManager;
    private final ApplicationConfiguration applicationConfiguration;

    public OrderRepositoryImpl(@CurrentSession EntityManager entityManager,
            ApplicationConfiguration applicationConfiguration) {
        this.entityManager = entityManager;
        this.applicationConfiguration = applicationConfiguration;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderEntity> findById(@NotNull Long id) {
        return Optional.ofNullable(entityManager.find(OrderEntity.class, id));
    }

    @Override
    @Transactional
    public OrderEntity save(@NotBlank String name) {
        OrderEntity order = new OrderEntity(name);
        entityManager.persist(order);
        return order;
    }

    @Override
    @Transactional
    public void deleteById(@NotNull Long id) {
        findById(id).ifPresent(order -> entityManager.remove(order));
    }

    private final static List<String> VALID_PROPERTY_NAMES = Arrays.asList("id", "name");

    @Transactional(readOnly = true)
    public List<OrderEntity> findAll(@NotNull SortingAndOrderArguments args) {
        String qlString = "SELECT g FROM Order as g";
        if (args.getOrder().isPresent() && args.getSort().isPresent()
                && VALID_PROPERTY_NAMES.contains(args.getSort().get())) {
            qlString += " ORDER BY g." + args.getSort().get() + " " + args.getOrder().get().toLowerCase();
        }
        TypedQuery<OrderEntity> query = entityManager.createQuery(qlString, OrderEntity.class);
        query.setMaxResults(args.getMax().orElseGet(this::getMax));
        args.getOffset().ifPresent(query::setFirstResult);

        return query.getResultList();
    }

    private Integer getMax() {
        return 10;
    }

    @Override
    @Transactional
    public int update(@NotNull Long id, @NotBlank String name) {
        return entityManager.createQuery("UPDATE OrderEntity g SET name = :name where id = :id")
                .setParameter("name", name).setParameter("id", id).executeUpdate();
    }
}