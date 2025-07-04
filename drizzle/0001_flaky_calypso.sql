PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_article` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`language` text DEFAULT 'en' NOT NULL,
	`cover` text DEFAULT '' NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`summary` text NOT NULL,
	`reading_time` integer DEFAULT 5 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer DEFAULT 1751149973200 NOT NULL,
	`created_at` integer DEFAULT 1751149973200 NOT NULL,
	`updated_at` integer DEFAULT 1751149973200 NOT NULL,
	`category_id` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_article`("id", "title", "language", "cover", "slug", "content", "summary", "reading_time", "status", "published_at", "created_at", "updated_at", "category_id") SELECT "id", "title", "language", "cover", "slug", "content", "summary", "reading_time", "status", "published_at", "created_at", "updated_at", "category_id" FROM `article`;--> statement-breakpoint
DROP TABLE `article`;--> statement-breakpoint
ALTER TABLE `__new_article` RENAME TO `article`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `article_slug_unique` ON `article` (`slug`);--> statement-breakpoint
CREATE TABLE `__new_category` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT 1751149973201 NOT NULL,
	`updated_at` integer DEFAULT 1751149973201 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_category`("id", "name", "slug", "created_at", "updated_at") SELECT "id", "name", "slug", "created_at", "updated_at" FROM `category`;--> statement-breakpoint
DROP TABLE `category`;--> statement-breakpoint
ALTER TABLE `__new_category` RENAME TO `category`;--> statement-breakpoint
CREATE UNIQUE INDEX `category_name_unique` ON `category` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_unique` ON `category` (`slug`);--> statement-breakpoint
CREATE TABLE `__new_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT 1751149973201 NOT NULL,
	`updated_at` integer DEFAULT 1751149973201 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_subscriber`("id", "email", "created_at", "updated_at") SELECT "id", "email", "created_at", "updated_at" FROM `subscriber`;--> statement-breakpoint
DROP TABLE `subscriber`;--> statement-breakpoint
ALTER TABLE `__new_subscriber` RENAME TO `subscriber`;--> statement-breakpoint
CREATE UNIQUE INDEX `subscriber_email_unique` ON `subscriber` (`email`);