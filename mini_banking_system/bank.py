#!/usr/bin/env py
""""""

from account import Account


class Bank:
    def __init__(self):
        self.__accounts: list[Account] = []
        self.__data_file = "storage.json"

    def create_account(self, name):
        userAccount = Account(name)
        self.__accounts.append(userAccount)

    def find_account(self, account_number):
        for item in self.__accounts:
            if account_number == item.account_number:
                return item
            else:
                return False

    def deposit(self, account_number, amount):
        userAccount = self.find_account(account_number)
        if userAccount:
            userAccount.deposit(amount)

    def withdraw(self, account_number, amount):
        pass

    def save_data(self):
        pass

    def load_data(self):
        pass

    def generate_statement(self):
        pass
