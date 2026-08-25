
class BankAccount:
    def __init__(self, balance=0, username="", password=""):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
            return True
        return False

    def _check_authentication(self):
        if not self.authenticated:
            raise Exception("Authentication required.")

    def deposit(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Deposit must be a positive integer.")

        self.balance += amount

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal must be a positive integer.")

        if amount > self.balance:
            raise Exception("Insufficient funds.")

        self.balance -= amount


class MinimumBalanceAccount(BankAccount):
    def __init__(
        self,
        balance=0,
        username="",
        password="",
        minimum_balance=0,
    ):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or amount <= 0:
            raise Exception("Withdrawal must be a positive integer.")

        if self.balance - amount <= self.minimum_balance:
            raise Exception("Minimum balance requirement would be violated.")

        self.balance -= amount


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list.")

        if not all(
            isinstance(account, (BankAccount, MinimumBalanceAccount))
            for account in account_list
        ):
            raise Exception("Invalid account in account_list.")

        self.account_list = account_list

        if not isinstance(try_limit, (int, float)) or try_limit <= 0:
            print("Invalid try limit. The default limit of 2 will be used.")
            self.try_limit = 2
        else:
            self.try_limit = int(try_limit)

        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while self.current_tries < self.try_limit:
            print("\n1. Log in")
            print("2. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")

                if self.log_in(username, password):
                    self.current_tries = 0
            elif choice == "2":
                print("Goodbye.")
                return
            else:
                print("Invalid choice.")

        print("You have reached the maximum number of tries.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print("Login successful.")
                self.show_account_menu(account)
                return True

        self.current_tries += 1
        print("Invalid username or password.")
        return False

    def show_account_menu(self, account):
        while account.authenticated:
            print("\n1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Choose an option: ")

            try:
                if choice == "1":
                    amount = int(input("Amount to deposit: "))
                    account.deposit(amount)
                    print(f"New balance: {account.balance}")

                elif choice == "2":
                    amount = int(input("Amount to withdraw: "))
                    account.withdraw(amount)
                    print(f"New balance: {account.balance}")

                elif choice == "3":
                    account.authenticated = False
                    print("Logged out.")
                    return

                else:
                    print("Invalid choice.")

            except ValueError:
                print("Please enter a valid integer.")
            except Exception as error:
                print(error)


# Example usage:
# account1 = BankAccount(1000, "john", "1234")
# account2 = MinimumBalanceAccount(1000, "jane", "5678", 200)
# atm = ATM([account1, account2], 3)