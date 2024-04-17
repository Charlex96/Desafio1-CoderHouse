export default class userDTOResponse {
  constructor(user) {
    this.full_name = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
  }
}
