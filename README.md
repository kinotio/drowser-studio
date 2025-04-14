<p align="center">
  <img
    src="drowser-studio.png"
    alt="Drowser Studio"
    style="width:100%;"
  />
</p>

<p align="center">
  <img
    src="public/images/drowser-studio.png"
    alt="Drowser Studio"
    style="width:100%;"
  />
</p>

![build](https://github.com/kinotiodotio/drowser-studio/workflows/build/badge.svg)

Track, Visualize and Analyze

> This Drowser Studio depend from reports collected from the Drowser Deno Package who is available on Denoland 🦕

You can find the `Drowser` lib from Denoland [here](https://deno.land/x/drowser)

## Setup

### Services

You need to have Docker installed on your machine. you can check [here](https://docs.docker.com/get-docker/) for installation instructions.

Run the docker compose file by executing the following command:

```bash
$ docker-compose up -d
```

### Application

Install dependencies:

```bash
$ pnpm install
```

And then install Infisical CLI [here](https://infisical.com/docs/cli/overview), then run these following commands:

Run database migration by executing the following command:

```bash
$ infisical run --env=dev --watch --recursive -- pnpm run db:migrate
```

And, Run the application by executing the following command:

```bash
$ infisical run --env=dev --watch --recursive -- pnpm dev
```

Or, if you don't have access to our Infisical, you can set all the environment variables from the `.env.example` file to your `.env` file by creating a new `.env` file in the root directory, and then running these following commands:

Run database migration by executing the following command:

```bash
$ pnpm run db:migrate
```

And, Run the application by executing the following command:

```bash
$ pnpm dev
```

## Roadmap

### Resume Features

- [ ] **Templates & Customization**
  - [ ] Multiple resume layout options/themes
  - [ ] Custom color schemes
  - [ ] Font customization options
  - [ ] Custom section ordering

### Report Enhancement

- [ ] **Advanced Visualizations**
  - [ ] Interactive dashboard components
  - [ ] Custom chart types and configurations
  - [ ] Data filtering and sorting options
  - [ ] Export visualizations as PNG/PDF

- [ ] **AI-Powered Analytics**
  - [ ] Trend detection and insights
  - [ ] Anomaly detection
  - [ ] Predictive analytics
  - [ ] Natural language report summaries

### User Experience

- [ ] **Collaboration Features**
  - [ ] Shared workspaces
  - [ ] Comment and annotation system
  - [ ] Real-time collaboration
  - [ ] Role-based access control

- [ ] **Workflow Integration**
  - [ ] Custom notification rules
  - [ ] Integration with CI/CD pipelines
  - [ ] Webhooks for external systems
  - [ ] API extensions for custom integrations

### Infrastructure

- [ ] **Performance Optimizations**
  - [ ] Server-side caching
  - [ ] Database query optimization
  - [ ] Lazy-loading for large datasets
  - [ ] Background processing for heavy tasks

- [ ] **Mobile Support**
  - [ ] Responsive mobile interface
  - [ ] Native mobile application
  - [ ] Offline capabilities
  - [ ] Push notifications

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.