package de.raphaeladohrmann.backend.uploadfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileData {

    private String id;

    private String filename;

    private String fileType;

    private String fileSize;

    private byte[] file;

    private String customerId;
}