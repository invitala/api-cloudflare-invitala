CREATE TABLE `assistant` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`comment` text,
	`is_ceremony` boolean NOT NULL,
	`is_celebration` boolean NOT NULL,
	CONSTRAINT `assistant_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `song` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`guest_name` text NOT NULL,
	`song_name` text NOT NULL,
	`url` text,
	CONSTRAINT `song_id` PRIMARY KEY(`id`)
);
