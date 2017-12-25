export class ChangedUrl {
  constructor(public classificator: string,
              public parentCode?: string,
              public childCode?: string,
              public withScrollToTree?: boolean) {
  }
}
