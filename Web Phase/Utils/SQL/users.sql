CREATE TABLE `users` (
    `id` varchar(256) NOT NULL,
    `name` varchar(45) DEFAULT NULL,
    `email` varchar(45) DEFAULT NULL,
    `password` varchar(256) DEFAULT NULL,
    `phone` varchar(45) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email_UNIQUE` (`email`)
)