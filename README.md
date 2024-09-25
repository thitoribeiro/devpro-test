#DevPro Performance Testing Project

This project contains a series of performance tests for a user listing API. Each test scenario simulates different load conditions and is designed to measure system performance under these conditions.

1 - Project Structure:

devpro/
│
├── config/
│   └── # K6 configuration files
│
├── reports/
│   └── # Reports generated after test execution
│
├── scenarios/
    ├── getListUsersLoadTest-script.js
    ├── getListUsersSoakTest-script.js
    ├── getListUsersSpikeTest-script.js
    ├── getListUsersStressTest-script.js

2 - Test Descriptions:

Load Test - getListUsersLoadTest-script.js
The load test simulates an increasing number of users accessing the system over time. The goal is to determine whether the system can handle the expected number of concurrent users without performance degradation. This type of test helps identify the acceptable traffic limit for the system.

Soak Test - getListUsersSoakTest-script.js
In the soak test, the system is exposed to a steady load over an extended period. The goal is to detect performance degradation issues that may arise from prolonged usage, such as memory leaks and stability failures.

Spike Test - getListUsersSpikeTest-script.js
This test evaluates how the system reacts to sudden and dramatic increases in user load. The goal is to assess the system's resilience and its ability to recover quickly from unexpected traffic spikes.

Stress Test - getListUsersStressTest-script.js
The stress test pushes the system beyond its capacity limits. The goal is to discover the system's breaking point, identifying how far it can go before experiencing significant performance issues.

3 - Prerequisites

Node.js - Make sure you have Node.js installed. You can download it here.
K6 - K6 is the load testing tool used in this project. Install it using the instructions below.


4 - Installing K6

Install K6 based on your operating system:

For Windows:
Download and install K6 for Windows.

For macOS:
You can install K6 via Homebrew:
brew install k6

For Linux:
On Debian/Ubuntu:
sudo apt install k6


5 - Running the Tests

After installing K6, you can run the tests as follows:

Load Test:


k6 run scenarios/getListUsersLoadTest-script.js

Soak Test:

k6 run scenarios/getListUsersSoakTest-script.js

Spike Test:

k6 run scenarios/getListUsersSpikeTest-script.js

Stress Test:

k6 run scenarios/getListUsersStressTest-script.js


6 - Generating Reports

Reports will be automatically generated in the reports/ folder after running the tests. These reports contain detailed information about the system's performance during each test.

