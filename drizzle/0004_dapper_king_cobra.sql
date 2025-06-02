CREATE TABLE `subscriber` (
	`id` text PRIMARY KEY DEFAULT 'cfc0ada5-682d-4001-b8f7-667596eef83f' NOT NULL,
	`email` text NOT NULL,
	`created_at` integer DEFAULT 0 NOT NULL,
	`updated_at` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriber_email_unique` ON `subscriber` (`email`);