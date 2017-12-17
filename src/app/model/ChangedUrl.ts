export class ChangedUrl {
  constructor(public classificator: string,
              public parentCode: number = 0,
              public childCode?: number) {
  }
}
