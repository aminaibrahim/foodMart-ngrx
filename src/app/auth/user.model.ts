export class userModel {
  constructor(
    public email: string,
    public uId: string,
    private _idToken: string,
    private expirationTime
  ) {}

  get token() {
    if (!this.expirationTime || new Date() > this.expirationTime) {
      return null;
    }
    return this._idToken;
  }
}
