module.exports = {
    page_objects_path: './test/acceptance/pageObjects',
    src_folders: ['test'],
    test_settings: {
        default: {
            selenium_host: '127.0.0.1',
            launch_url: 'http://localhost:3000',
            globals: {
                backend_url: 'http://localhost:8000',
                admin_username: 'admin@prohealth.com',
                admin_password: 'pass1234'
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                chromeOptions: {
                    args: ['disable-gpu'],
                    w3c: false
                }
            }
        }
    }
}