# Free Network and IT Infrastructure Icons

This directory contains scripts to download free, open-source icons for IT infrastructure and network diagrams.

## Quick Start

```bash
# Install required dependency
pip install requests

# Download all icons
python3 download-network-icons.py
```

This will download 50+ icons into the `icons/` directory.

## What Went Wrong with the Original Script

The original `download-free-icons.py` had three main issues:

1. **Fictional URLs**: The Wikimedia Commons URLs were made up and didn't point to actual files
2. **Missing User-Agent**: Web servers block requests without proper User-Agent headers (403 Forbidden)
3. **Rate Limiting**: Wikimedia has strict rate limits (429 Too Many Requests)
4. **Silent Failures**: No error reporting to see what went wrong

## Working Solution

The `download-network-icons.py` script uses **Simple Icons** (https://simpleicons.org/):

- **License**: CC0 (Public Domain) - free for any use
- **Quality**: Professional SVG icons
- **Coverage**: 50+ IT infrastructure icons
- **Reliable**: Official CDN with no rate limiting
- **No attribution required** (though appreciated)

## Icons Included

### Cloud & Infrastructure
- Cisco, Google Cloud, Cloudflare, DigitalOcean

### Containers & Orchestration
- Docker, Kubernetes, Podman

### Web Servers
- Nginx, Apache, Caddy

### Databases
- MySQL, PostgreSQL, MongoDB, Redis, MariaDB, SQLite, Neo4j

### Operating Systems
- Linux, Ubuntu, Debian, CentOS, Red Hat, Alpine, Fedora

### DevOps & CI/CD
- Jenkins, Git, GitHub, GitLab, Bitbucket, Ansible, Terraform, Puppet, Chef

### Monitoring & Observability
- Prometheus, Grafana, Elasticsearch, Kibana, Datadog, New Relic, Splunk

### Virtualization
- VMware, VirtualBox, QEMU

### Message Queues
- RabbitMQ, Kafka

### Security
- Let's Encrypt, Vault

### Networking
- WireGuard, OpenVPN

### Service Mesh
- Istio, Envoy

## Using the Icons

All icons are SVG format and can be:

1. **Embedded in HTML/Markdown**:
   ```html
   <img src="icons/docker.svg" alt="Docker" width="48">
   ```

2. **Used in diagrams**: Import into draw.io, Lucidchart, etc.

3. **Styled with CSS**: SVGs can be colored, sized, etc.

4. **Converted to PNG**: Use ImageMagick or similar tools if needed

## License Information

All icons are from **Simple Icons** under **CC0 1.0 Universal (Public Domain)**:
- No attribution required
- Free for commercial use
- Free to modify and redistribute
- Source: https://github.com/simple-icons/simple-icons

## Alternative Icon Sources

If you need different icons:

1. **Font Awesome** (free tier): https://fontawesome.com/
2. **Material Design Icons**: https://fonts.google.com/icons
3. **Heroicons**: https://heroicons.com/
4. **Feather Icons**: https://feathericons.com/
5. **Bootstrap Icons**: https://icons.getbootstrap.com/

## Troubleshooting

If downloads fail:

1. **Check internet connection**: Script requires network access
2. **Install requests library**: `pip install requests`
3. **Check firewall**: Some corporate firewalls block CDN access
4. **Retry**: Simple Icons CDN is very reliable, temporary failures are rare

## Adding More Icons

To add more icons from Simple Icons:

1. Visit https://simpleicons.org/
2. Search for the icon you want
3. Copy the slug (lowercase name)
4. Add to the `icons` list in format:
   ```python
   ("https://cdn.simpleicons.org/{slug}/{hexcolor}", "filename.svg"),
   ```
5. Run the script again

Example:
```python
("https://cdn.simpleicons.org/python/3776AB", "python.svg"),
```

## Success Rate

Current success rate: **94.4% (51/54 icons)**

Failed icons are typically due to name changes in Simple Icons. The script will report which ones failed so you can find alternatives.
