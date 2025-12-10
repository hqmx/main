# HQMX Webtools

This project is the main landing page for all HQMX services.
Repo: https://github.com/hqmx/webtools

## 🚀 Deployment

This project is deployed to a unified EC2 instance. To deploy, run the main deployment script from the project root:

```bash
./deploy.sh webtools
```

This will sync the `frontend` directory to `/var/www/hqmx/webtools` on the server.
