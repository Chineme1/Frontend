import bcrypt from "bcryptjs";

export class User {
  id;
  firstName;
  lastName;
  email;
  dateOfBirth;
  mailingAddress;
  username;
  password;
  isLoggedIn = false;
  isSeller = false;

  constructor(
    id,
    firstName,
    lastName,
    email,
    dateOfBirth,
    mailingAddress,
    username,
    password,
    isSeller
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.mailingAddress = mailingAddress;
    this.username = username;
    this.password = bcrypt.hashSync(password, 10);
    this.isSeller = isSeller;
  }

  createAccount() {
    alert(`User ${this.firstName} ${this.lastName} created successfully`);
  }

  login(email, password) {
    const logIn = () => {
      console.log('calling')
      fetch('http://localhost:3080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((r) => r.json())
        .then((r) => {
          if ('success' === r.message) {
            localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
            this.isLoggedIn = (true)
            this.email = (email)
            // navigate('/')
          } else {
            window.alert('Wrong email or password')
          }
        })
    }
    logIn();
    if (this.email === email && bcrypt.compareSync(password, this.password)) {
      this.isLoggedIn = true;
      console.log(`User ${this.email} logged in.`);
      return true;
    } else {
      console.log("Invalid email or password.");
      return false;
    }
  }

  logout() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false;
      console.log(
        `User ${this.firstName} ${this.lastName} logged out successfully`
      );
      return;
    } else {
      console.log("No recorded logged in user present in the system");
      return;
    }
  }
}
