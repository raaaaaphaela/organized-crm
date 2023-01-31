package de.raphaeladohrmann.backend.uploadfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadFile {

    private String id;

    private String filename;

    private String fileType;

    private String fileSize;

    private byte[] file;

    private String createdBy;
}