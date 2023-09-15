CREATE TABLE `admins` (
    `id` varchar(256) NOT NULL,
    `email` varchar(256) DEFAULT NULL,
    `password` varchar(256) DEFAULT NULL,
    `username` varchar(256) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `name` varchar(256) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email_UNIQUE` (`email`),
    UNIQUE KEY `username_UNIQUE` (`username`)
)