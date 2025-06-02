PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_subscriber` (
	`id` text PRIMARY KEY DEFAULT '5d8e18e6-cb21-40cc-ae8e-3208250b4f95' NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT 0 NOT NULL,
	`updated_at` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_subscriber`("id", "email", "created_at", "updated_at") SELECT "id", "email", "created_at", "updated_at" FROM `subscriber`;--> statement-breakpoint
DROP TABLE `subscriber`;--> statement-breakpoint
ALTER TABLE `__new_subscriber` RENAME TO `subscriber`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `subscriber_email_unique` ON `subscriber` (`email`);