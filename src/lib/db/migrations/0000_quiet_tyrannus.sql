CREATE TABLE `categories` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`public_id` varchar(16) NOT NULL,
	`user_id` varchar(160) NOT NULL,
	`name` varchar(80) NOT NULL,
	`status` enum('active','inactive','removed') DEFAULT 'active',
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`removed_at` timestamp,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_public_id_unique` UNIQUE(`public_id`),
	CONSTRAINT `categories_user_id_name_unique` UNIQUE(`user_id`,`name`)
);
