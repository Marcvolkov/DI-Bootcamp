// test-api.js - Simple script to test the JWT authentication API
const http = require('http');

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            
            res.on('data', (chunk) => {
                body += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: parsedBody
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test function
async function testAPI() {
    console.log('🚀 Testing JWT Authentication API');
    console.log('=====================================');
    
    const baseUrl = 'localhost';
    const port = 3000;
    let accessToken = null;
    let cookies = '';
    
    try {
        // Test 1: Register a new user
        console.log('\n1. Testing User Registration...');
        const registerOptions = {
            hostname: baseUrl,
            port: port,
            path: '/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const registerData = {
            username: 'testuser123',
            email: 'test@example.com',
            password: 'password123'
        };
        
        const registerResponse = await makeRequest(registerOptions, registerData);
        console.log(`Status: ${registerResponse.statusCode}`);
        console.log(`Response:`, registerResponse.body);
        
        if (registerResponse.statusCode === 201) {
            accessToken = registerResponse.body.tokens.accessToken;
            // Extract cookies
            const setCookieHeader = registerResponse.headers['set-cookie'];
            if (setCookieHeader) {
                cookies = setCookieHeader.map(cookie => cookie.split(';')[0]).join('; ');
            }
            console.log('✅ Registration successful!');
        } else {
            console.log('❌ Registration failed');
        }
        
        // Test 2: Login with the same user
        console.log('\n2. Testing User Login...');
        const loginOptions = {
            hostname: baseUrl,
            port: port,
            path: '/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        const loginData = {
            email: 'test@example.com',
            password: 'password123'
        };
        
        const loginResponse = await makeRequest(loginOptions, loginData);
        console.log(`Status: ${loginResponse.statusCode}`);
        console.log(`Response:`, loginResponse.body);
        
        if (loginResponse.statusCode === 200) {
            accessToken = loginResponse.body.tokens.accessToken;
            const setCookieHeader = loginResponse.headers['set-cookie'];
            if (setCookieHeader) {
                cookies = setCookieHeader.map(cookie => cookie.split(';')[0]).join('; ');
            }
            console.log('✅ Login successful!');
        } else {
            console.log('❌ Login failed');
        }
        
        // Test 3: Access protected route with token
        console.log('\n3. Testing Protected Route (Profile)...');
        const profileOptions = {
            hostname: baseUrl,
            port: port,
            path: '/api/profile',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Cookie': cookies
            }
        };
        
        const profileResponse = await makeRequest(profileOptions);
        console.log(`Status: ${profileResponse.statusCode}`);
        console.log(`Response:`, profileResponse.body);
        
        if (profileResponse.statusCode === 200) {
            console.log('✅ Protected route access successful!');
        } else {
            console.log('❌ Protected route access failed');
        }
        
        // Test 4: Access protected route (Dashboard)
        console.log('\n4. Testing Protected Route (Dashboard)...');
        const dashboardOptions = {
            hostname: baseUrl,
            port: port,
            path: '/api/dashboard',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Cookie': cookies
            }
        };
        
        const dashboardResponse = await makeRequest(dashboardOptions);
        console.log(`Status: ${dashboardResponse.statusCode}`);
        console.log(`Response:`, dashboardResponse.body);
        
        if (dashboardResponse.statusCode === 200) {
            console.log('✅ Dashboard access successful!');
        } else {
            console.log('❌ Dashboard access failed');
        }
        
        // Test 5: Test token refresh
        console.log('\n5. Testing Token Refresh...');
        const refreshOptions = {
            hostname: baseUrl,
            port: port,
            path: '/auth/refresh',
            method: 'POST',
            headers: {
                'Cookie': cookies
            }
        };
        
        const refreshResponse = await makeRequest(refreshOptions);
        console.log(`Status: ${refreshResponse.statusCode}`);
        console.log(`Response:`, refreshResponse.body);
        
        if (refreshResponse.statusCode === 200) {
            console.log('✅ Token refresh successful!');
            accessToken = refreshResponse.body.tokens.accessToken;
        } else {
            console.log('❌ Token refresh failed');
        }
        
        // Test 6: Access without token (should fail)
        console.log('\n6. Testing Access Without Token (Should Fail)...');
        const noTokenOptions = {
            hostname: baseUrl,
            port: port,
            path: '/api/profile',
            method: 'GET'
        };
        
        const noTokenResponse = await makeRequest(noTokenOptions);
        console.log(`Status: ${noTokenResponse.statusCode}`);
        console.log(`Response:`, noTokenResponse.body);
        
        if (noTokenResponse.statusCode === 401) {
            console.log('✅ Properly rejected request without token!');
        } else {
            console.log('❌ Should have rejected request without token');
        }
        
        // Test 7: Logout
        console.log('\n7. Testing Logout...');
        const logoutOptions = {
            hostname: baseUrl,
            port: port,
            path: '/auth/logout',
            method: 'POST',
            headers: {
                'Cookie': cookies
            }
        };
        
        const logoutResponse = await makeRequest(logoutOptions);
        console.log(`Status: ${logoutResponse.statusCode}`);
        console.log(`Response:`, logoutResponse.body);
        
        if (logoutResponse.statusCode === 200) {
            console.log('✅ Logout successful!');
        } else {
            console.log('❌ Logout failed');
        }
        
        console.log('\n🎉 API Testing Complete!');
        console.log('=====================================');
        
    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

// Check if server is running
function checkServer() {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        console.log('✅ Server is running, starting tests...\n');
        testAPI();
    });
    
    req.on('error', (error) => {
        console.log('❌ Server is not running. Please start the server first:');
        console.log('   npm run dev');
        console.log('   or');
        console.log('   npm start');
    });
    
    req.end();
}

// Run the test
console.log('Checking if server is running...');
checkServer();