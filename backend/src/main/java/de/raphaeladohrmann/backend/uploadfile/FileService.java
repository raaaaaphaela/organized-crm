package de.raphaeladohrmann.backend.uploadfile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import de.raphaeladohrmann.backend.appuser.AppUserService;
import de.raphaeladohrmann.backend.customer.Customer;
import de.raphaeladohrmann.backend.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FileService {

    private final GridFsTemplate template;

    private final GridFsOperations operations;

    private final CustomerRepository customerRepository;

    private final AppUserService appUserService;

    public String addFile(String customerId, MultipartFile uploadFile) throws IOException {

        if (uploadFile.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is not valid.");
        }

        Optional<Customer> customer = customerRepository.findByIdAndBelongsToCompany(
                customerId, appUserService.getAuthenticatedUser().getCompany());

        if (customer.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", uploadFile.getSize());
        metadata.put("customerId", customer.get().getId());

        Object fileID = template.store(
                uploadFile.getInputStream(),
                uploadFile.getOriginalFilename(),
                uploadFile.getContentType(), metadata);

        return fileID.toString();
    }

    public FileData downloadFile(String id) throws IOException {

        GridFSFile gridFSFile = getFileByCustomerId(id);

        return buildFileData(gridFSFile);
    }

    private FileData buildFileData(GridFSFile gridFSFile) throws IOException {
        FileData file = new FileData();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {

            file.setFilename(gridFSFile.getFilename());

            file.setFileType(gridFSFile.getMetadata().get("_contentType").toString());

            file.setFileSize(gridFSFile.getMetadata().get("fileSize").toString());

            file.setFile(IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()));
        }

        return file;
    }

    public GridFSFile getFileByCustomerId(String id) {
        return Optional.ofNullable(
                template.findOne(
                        new Query().addCriteria(
                                Criteria.where("metadata.customerId").is(id)))
        ).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found"));
    }

    public void deleteFileFromCustomer(String id) {
        template.delete(Query.query(
                Criteria.where("metadata.customerId").is(id)));
    }
}