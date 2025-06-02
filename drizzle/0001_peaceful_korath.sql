ALTER TABLE `post` ADD `slug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `content` text NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `summary` text NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `status` text DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `published_at` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `created_at` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `post` ADD `updated_at` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `post_slug_unique` ON `post` (`slug`);