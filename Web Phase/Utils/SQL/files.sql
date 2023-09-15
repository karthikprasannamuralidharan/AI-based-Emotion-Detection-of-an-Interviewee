CREATE TABLE `files` (
    `id` int NOT NULL AUTO_INCREMENT,
    `file_name` varchar(256) DEFAULT NULL,
    `storage_name` varchar(256) DEFAULT NULL,
    `is_report_is_ready` varchar(45) NOT NULL DEFAULT ''No'',
    `upload_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `report_creation_time` timestamp NULL DEFAULT NULL,
    `uploaded_by` varchar(256) NOT NULL,
    `report_file_name` varchar(256) DEFAULT NULL,
    `type` varchar(45) DEFAULT ''video'',
    PRIMARY KEY (`id`)
) 