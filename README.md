<p align="center">
  <img
    src="drowser.png"
    alt="Drowser"
    style="width:100%;"
  />
</p>

![build](https://github.com/kinotio/drowser/workflows/build/badge.svg)
![license](https://img.shields.io/github/license/kinotio/drowser?color=success)
![tags](https://ghcr-badge.egpl.dev/kinotio/drowser/tags?trim=major&color=chocolate)
![latest](https://ghcr-badge.egpl.dev/kinotio/drowser/latest_tag?trim=major&label=latest&color=blueviolet)
![size](https://ghcr-badge.egpl.dev/kinotio/drowser/size?color=blue)

You can find the `Drowser` lib from Denoland [here](https://deno.land/x/drowser)

Tools to help you automate your testing, track progress, and ensure your software is ready for deployment. Say goodbye to manual testing and hello to efficiency 🖥️ 📈

> This Drowser Studio depend from reports collected from the Drowser Deno Package who is available on Denoland for now 🦕

## Usage

Pull directly the Drowser image from the Github Container Registry:

```sh
docker pull ghcr.io/kinotio/drowser:latest
```

And run it

```sh
docker run --name kinotio_drowser -p 3000:3000 -d ghcr.io/kinotio/drowser:latest
```

## Features

### Landing Page

Import your reports on the landing page

<p align="center">
  <img
    src="presentations/landing.png"
    alt="Landing"
    style="width:100%;"
  />
</p>

### Dashboard

You can access to the main cases dashboard to get a visulization , track passed or failed cases , get an overview of all informations from each test cases

<p align="center">
  <img
    src="presentations/dashboard.png"
    alt="Dashboard"
    style="width:100%;"
  />
</p>

### Cases

And, in the other view you can access directly the metric from each test case

<p align="center">
  <img
    src="presentations/dashboard-case.png"
    alt="Case"
    style="width:100%;"
  />
</p>

### Drowser AI

We're still working with this feature to get able to ask the AI to get a prediction and analyse from the test data 🛠️🤖

### Playground

We're still working with this feature to get able to write directly from the platform app instead of using the [Drowser](https://deno.land/x/drowser) Deno lib 🛠️✍🏻

## Build from source

You can use Docker to use it as service inside a container or test it in your local machine
Clone the repository and change directory to be inside of the repository directory and run these commands

Build the Docker image with this command

```sh
docker build -t kinotio/drowser .
```

And, run it with this

```sh
docker run --name kinotio_drowser -p 3000:3000 -d kinotio/drowser
```

## LICENSE

[MIT](LICENSE).
