package de.raphaeladohrmann.backend.customer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {
    List<Customer> findAllByBelongsToCompany(String company);

    Optional<Customer> findByIdAndBelongsToCompany(String id, String company);
}
