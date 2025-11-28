# HQMX Main

This project is the main landing page for all HQMX services.

## 🚀 Deployment

This project is deployed to a unified EC2 instance. To deploy, run the main deployment script from the project root:

```bash
./deploy_all_to_ec2.sh
```

This will sync the `frontend` directory to `/var/www/hqmx/` on the server.
