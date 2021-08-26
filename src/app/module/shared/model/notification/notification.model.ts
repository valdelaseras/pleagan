export class Notification {
  message: string;
  level: NotificationLevel;
  dismissed: boolean = false;
  title?: string;
  thumbnailUrl?: string;
  url?: string;

  constructor( message: string, level: NotificationLevel, title?: string, url?: string, thumbnailUrl?: string ) {
    this.message = message;
    this.level = level;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  };
}

export type NotificationLevel = 'info' | 'success' | 'warning' | 'danger';
