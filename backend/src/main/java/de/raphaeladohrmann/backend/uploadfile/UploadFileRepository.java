package de.raphaeladohrmann.backend.uploadfile;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadFileRepository extends MongoRepository<UploadFile, String> {

    UploadFile findByIdAndCreatedBy();
}