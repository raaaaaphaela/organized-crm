package de.raphaeladohrmann.backend.uploadfile;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UploadFileService {

    private final GridFsTemplate template;

    private final GridFsOperations operations;

    public String addFile(MultipartFile uploadFile) throws IOException {

        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", uploadFile.getSize());

        Object fileID = template.store(
                uploadFile.getInputStream(),
                uploadFile.getOriginalFilename(),
                uploadFile.getContentType(), metadata);

        return fileID.toString();
    }

    public UploadFile downloadFile(String id) throws IOException {

        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("_id").is(id)) );

        UploadFile file = new UploadFile();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {

            file.setFilename( gridFSFile.getFilename() );

            file.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );

            file.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );

            file.setFile( IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()) );
        }

        return file;
    }
}