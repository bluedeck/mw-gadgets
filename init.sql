CREATE TABLE IF NOT EXISTS `contents` (`id` BIGINT NOT NULL auto_increment ,
     `content` MEDIUMTEXT NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `contents`
ALTER TABLE `contents` ADD UNIQUE INDEX `contents_id` (`id`)
CREATE TABLE IF NOT EXISTS `users` (`id` BIGINT NOT NULL auto_increment ,
     `username` VARCHAR(512) NOT NULL UNIQUE,
     `username_lowercase` VARCHAR(512) NOT NULL UNIQUE,
     `stat` TEXT NOT NULL,
     `credential_m2` CHAR(64) NOT NULL,
     `server_salt` CHAR(64) NOT NULL,
     `client_salt` CHAR(64) NOT NULL,
     `secret_2fa` CHAR(64) NOT NULL,
     `secret_3fa` CHAR(64) NOT NULL,
     `secret_recovery` CHAR(64) NOT NULL,
     `mfa_2fa_enabled` TINYINT(1) NOT NULL DEFAULT false,
     `mfa_2fa_enabled_time` DATETIME,
     `recovery_key_acquired` TINYINT(1) NOT NULL DEFAULT false,
     `recovery_key_acquired_time` DATETIME,
     `email` VARCHAR(512) UNIQUE,
     `locked` TINYINT(1) NOT NULL DEFAULT false,
     `blocked` TINYINT(1) NOT NULL DEFAULT false,
     `blocked_till` DATETIME,
     `blocked_indef` TINYINT(1) NOT NULL DEFAULT false,
     `level` BIGINT NOT NULL DEFAULT 0,
     `notification_count` BIGINT NOT NULL DEFAULT 0,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     UNIQUE `users_username_unique` (`username`),
     UNIQUE `users_username_lowercase_unique` (`username_lowercase`),
     UNIQUE `users_email_unique` (`email`),
     PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `users`
ALTER TABLE `users` ADD UNIQUE INDEX `users_id` (`id`)
ALTER TABLE `users` ADD UNIQUE INDEX `users_username` (`username`)
ALTER TABLE `users` ADD UNIQUE INDEX `users_username_lowercase` (`username_lowercase`)
ALTER TABLE `users` ADD UNIQUE INDEX `users_email` (`email`)
CREATE TABLE IF NOT EXISTS `sessions` (`id` BIGINT NOT NULL auto_increment ,
     `summary` VARCHAR(512),
     `secret` CHAR(64) NOT NULL,
     `expiry` DATETIME NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     `user_id` BIGINT NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `sessions`
ALTER TABLE `sessions` ADD UNIQUE INDEX `sessions_id` (`id`)
ALTER TABLE `sessions` ADD INDEX `sessions_user_id` (`user_id`)
CREATE TABLE IF NOT EXISTS `feeds` (`id` BIGINT NOT NULL auto_increment ,
     `name` VARCHAR(512),
     `stat` TEXT,
     `deleted` TINYINT(1) NOT NULL DEFAULT false,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `feeds`
ALTER TABLE `feeds` ADD UNIQUE INDEX `feeds_id` (`id`)
ALTER TABLE `feeds` ADD INDEX `feeds_name` (`name`)
CREATE TABLE IF NOT EXISTS `pages` (`id` BIGINT NOT NULL auto_increment ,
     `name` VARCHAR(512) UNIQUE,
     `direct_access` TINYINT(1) NOT NULL DEFAULT true,
     `stat` TEXT NOT NULL,
     `deleted` TINYINT(1) NOT NULL DEFAULT false,
     `protected` TINYINT(1) NOT NULL DEFAULT false,
     `protected_till` DATETIME,
     `protected_indef` TINYINT(1) NOT NULL DEFAULT false,
     `mime_type` VARCHAR(128) NOT NULL DEFAULT 'text/plain',
     `feed_id` BIGINT,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     UNIQUE `pages_name_unique` (`name`),
     PRIMARY KEY (`id`),
     FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `pages`
ALTER TABLE `pages` ADD UNIQUE INDEX `pages_id` (`id`)
ALTER TABLE `pages` ADD UNIQUE INDEX `pages_name` (`name`)
ALTER TABLE `pages` ADD UNIQUE INDEX `pages_feed_id` (`feed_id`)
CREATE TABLE IF NOT EXISTS `histories` (`id` BIGINT NOT NULL auto_increment ,
     `summary` VARCHAR(512),
     `deleted` TINYINT(1) NOT NULL DEFAULT false,
     `page_id` BIGINT NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     `user_id` BIGINT NOT NULL,
     `content_id` BIGINT NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`content_id`) REFERENCES `contents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `histories`
ALTER TABLE `histories` ADD UNIQUE INDEX `histories_id` (`id`)
ALTER TABLE `histories` ADD INDEX `histories_page_id` (`page_id`)
CREATE TABLE IF NOT EXISTS `clearances` (`name` VARCHAR(1024) NOT NULL UNIQUE ,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     UNIQUE `clearances_name_unique` (`name`),
     PRIMARY KEY (`name`)) ENGINE=InnoDB;
SHOW INDEX FROM `clearances`
ALTER TABLE `clearances` ADD UNIQUE INDEX `clearances_name` (`name`)
CREATE TABLE IF NOT EXISTS `notifications` (`id` BIGINT NOT NULL auto_increment ,
     `title` VARCHAR(512),
     `summary` VARCHAR(512),
     `content` TEXT NOT NULL,
     `deleted` TINYINT(1) NOT NULL DEFAULT false,
     `retracted` TINYINT(1) NOT NULL DEFAULT false,
     `viewed` TINYINT(1) NOT NULL DEFAULT false,
     `marked_off` TINYINT(1) NOT NULL DEFAULT false,
     `issuer_id` BIGINT NOT NULL,
     `recipient_id` BIGINT NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`issuer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `notifications`
ALTER TABLE `notifications` ADD UNIQUE INDEX `notifications_id` (`id`)
ALTER TABLE `notifications` ADD INDEX `notifications_issuer_id` (`issuer_id`)
ALTER TABLE `notifications` ADD INDEX `notifications_recipient_id` (`recipient_id`)
CREATE TABLE IF NOT EXISTS `logs` (`id` BIGINT NOT NULL auto_increment ,
     `stat` TEXT NOT NULL,
     `type` VARCHAR(512),
     `summary` VARCHAR(512),
     `actor_id` BIGINT NOT NULL,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     `affected_user_id` BIGINT,
     `page_id` BIGINT,
     `feed_id` BIGINT,
     `history_id` BIGINT,
     `session_id` BIGINT,
     `notification_id` BIGINT,
     PRIMARY KEY (`id`),
     FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`affected_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
     FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
     FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
     FOREIGN KEY (`history_id`) REFERENCES `histories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
     FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
     FOREIGN KEY (`notification_id`) REFERENCES `notifications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `logs`
ALTER TABLE `logs` ADD UNIQUE INDEX `logs_id` (`id`)
ALTER TABLE `logs` ADD INDEX `logs_actor_id` (`actor_id`)
CREATE TABLE IF NOT EXISTS `user_clearances` (`user_id` BIGINT NOT NULL ,
     `clearance_name` VARCHAR(1024) NOT NULL ,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     UNIQUE `user_clearances_clearance_name_user_id_unique` (`user_id`,
     `clearance_name`),
     PRIMARY KEY (`user_id`,
     `clearance_name`),
     FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`clearance_name`) REFERENCES `clearances` (`name`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `user_clearances`
ALTER TABLE `user_clearances` ADD UNIQUE INDEX `user_clearances_user_id_clearance_name` (`user_id`,
     `clearance_name`)
CREATE TABLE IF NOT EXISTS `history_clearances` (`type` VARCHAR(512) NOT NULL ,
     `history_id` BIGINT NOT NULL ,
     `clearance_name` VARCHAR(1024) NOT NULL ,
     `created_at` DATETIME NOT NULL,
     `updated_at` DATETIME NOT NULL,
     UNIQUE `history_clearances_type_history_id_clearance_name_unique` (`type`,
     `history_id`,
     `clearance_name`),
     PRIMARY KEY (`type`,
     `history_id`,
     `clearance_name`),
     FOREIGN KEY (`history_id`) REFERENCES `histories` (`id`),
     FOREIGN KEY (`clearance_name`) REFERENCES `clearances` (`name`)) ENGINE=InnoDB;
SHOW INDEX FROM `history_clearances`
ALTER TABLE `history_clearances` ADD UNIQUE INDEX `history_clearances_type_history_id_clearance_name` (`type`,
     `history_id`,
     `clearance_name`)
