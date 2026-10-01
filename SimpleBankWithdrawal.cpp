//Code written by Claude.ai with minimal edits
//The program assumes input in sent by a front-end program, rather than by a user directly.
//Input starts with an Integer n representing the number of bank accounts simulated by the program.
//Following this are n pairs of strings representing user's names and cash ammounts as strings.
//Input ends with the username of the active user followed by the cash ammount the user wishes to withdraw.

#include <iostream>
#include <string>
#include <vector>
using std::vector, std::string, std::cin, std::cout;

vector<vector<string>> readUserAccounts() {
    vector<vector<string>> userAccounts;

    std::size_t accountCount = 0;
    cin >> accountCount;

    for (std::size_t i = 0; i < accountCount; ++i) {
        string userName;
        string balance;
        if (!(cin >> userName >> balance)) {
            break;
        }
        userAccounts.push_back({userName, balance});
    }

    return userAccounts;
}

int findUserIndex(const vector<vector<string>>& userAccounts,
                  const string& userName) {
    for (std::size_t i = 0; i < userAccounts.size(); ++i) {
        if (userAccounts[i][0] == userName) {
            return static_cast<int>(i);
        }
    }
    return -1;
}

bool canWithdraw(double balance, double withdrawalAmount) {
    return withdrawalAmount > 0 && balance >= withdrawalAmount;
}

int main() {
    vector<vector<string>> userAccounts = readUserAccounts();

    string userName;
    cin >> userName;

    int userIndex = findUserIndex(userAccounts, userName);
    if (userIndex == -1) {
        cout << "Denied: no account found for " << userName << ".\n";
        return 1;
    }

    double balance = std::stod(userAccounts[userIndex][1]);

    double withdrawalAmount;
    if (!(cin >> withdrawalAmount)) {
        cout << "Denied: invalid amount.\n";
        return 1;
    }

    if (canWithdraw(balance, withdrawalAmount)) {
        balance -= withdrawalAmount;
        userAccounts[userIndex][1] = std::to_string(balance);
        cout << "Approved. New balance: $" << balance << ".\n";
    } else {
        cout << "Denied: insufficient funds or invalid amount.\n";
    }

    return 0;
}
