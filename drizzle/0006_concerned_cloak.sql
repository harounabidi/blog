PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_post` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`cover` text DEFAULT '' NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`summary` text NOT NULL,
	`reading_time` integer DEFAULT 5 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` integer DEFAULT 1748683524806 NOT NULL,
	`created_at` integer DEFAULT 1748683524806 NOT NULL,
	`updated_at` integer DEFAULT 1748683524806 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_post`("id", "title", "cover", "slug", "content", "summary", "reading_time", "status", "published_at", "created_at", "updated_at") SELECT "id", "title", "cover", "slug", "content", "summary", "reading_time", "status", "published_at", "created_at", "updated_at" FROM `post`;--> statement-breakpoint
DROP TABLE `post`;--> statement-breakpoint
ALTER TABLE `__new_post` RENAME TO `post`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `post_slug_unique` ON `post` (`slug`);--> statement-breakpoint
CREATE TABLE `__new_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT 1748683524806 NOT NULL,
	`updated_at` integer DEFAULT 1748683524806 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_subscriber`("id", "email", "created_at", "updated_at") SELECT "id", "email", "created_at", "updated_at" FROM `subscriber`;--> statement-breakpoint
DROP TABLE `subscriber`;--> statement-breakpoint
ALTER TABLE `__new_subscriber` RENAME TO `subscriber`;--> statement-breakpoint
CREATE UNIQUE INDEX `subscriber_email_unique` ON `subscriber` (`email`);