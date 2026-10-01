//Code written by Claude.ai with minimal edits
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