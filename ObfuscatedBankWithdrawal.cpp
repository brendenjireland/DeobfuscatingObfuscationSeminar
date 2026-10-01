//Code written by Claude.ai with minimal edits
#include <iostream>
#include <string>
#include <vector>

using std::vector, std::string, std::cin, std::cout;

vector<vector<string>> zQ7xv() {
    vector<vector<string>> kW3p;

    std::size_t Rm9tL = 0;
    cin >> Rm9tL;

    for (std::size_t j4Xb = 0; j4Xb < Rm9tL; ++j4Xb) {
        string vT2nK;
        string pH8cY;
        if (!(cin >> vT2nK >> pH8cY)) {
            break;
        }
        kW3p.push_back({vT2nK, pH8cY});
    }

    return kW3p;
}

int Bf6sZ(const vector<vector<string>>& kW3p,
          const string& uD5qe) {
    for (std::size_t j4Xb = 0; j4Xb < kW3p.size(); ++j4Xb) {
        if (kW3p[j4Xb][0] == uD5qe) {
            return static_cast<int>(j4Xb);
        }
    }
    return -1;
}

bool Xc1mW(double nG7ya, double eL0ro) {
    return eL0ro > 0 && nG7ya >= eL0ro;
}

int main() {
    vector<vector<string>> kW3p = zQ7xv();

    string uD5qe;
    cin >> uD5qe;

    int aS9dh = Bf6sZ(kW3p, uD5qe);
    if (aS9dh == -1) {
        cout << "Denied: no account found for " << uD5qe << ".\n";
        return 1;
    }

    double nG7ya = std::stod(kW3p[aS9dh][1]);

    double eL0ro;
    if (!(cin >> eL0ro)) {
        cout << "Denied: invalid amount.\n";
        return 1;
    }

    if (Xc1mW(nG7ya, eL0ro)) {
        nG7ya -= eL0ro;
        kW3p[aS9dh][1] = std::to_string(nG7ya);
        cout << "Approved. New balance: $" << nG7ya << ".\n";
    } else {
        cout << "Denied: insufficient funds or invalid amount.\n";
    }

    return 0;
}