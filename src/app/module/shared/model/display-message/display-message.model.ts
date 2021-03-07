export class DisplayMessage {
  message: string;
  level: DisplayMessageLevel;
  dismissed: boolean = false;

  constructor( message: string, level: DisplayMessageLevel ) {
    this.message = message;
    this.level = level;
  };
}

export type DisplayMessageLevel = 'info' | 'success' | 'warning' | 'danger';
