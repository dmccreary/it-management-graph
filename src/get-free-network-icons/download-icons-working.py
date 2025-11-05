#!/usr/bin/env python3
"""
Working icon downloader using actual free icon sources
This uses Simple Icons (MIT license) and other verified free sources
"""
import os
import requests
import time

# Real, verified free icon URLs
# Using a mix of sources: Simple Icons, Wikimedia Commons (verified), and other CC0/public domain
icons = [
    # Simple Icons (https://simpleicons.org/) - CC0 license
    ("https://cdn.simpleicons.org/cisco/1BA0D7", "cisco.svg"),
    ("https://cdn.simpleicons.org/amazonwebservices/FF9900", "aws.svg"),
    ("https://cdn.simpleicons.org/microsoftazure/0078D4", "azure.svg"),
    ("https://cdn.simpleicons.org/googlecloud/4285F4", "gcp.svg"),
    ("https://cdn.simpleicons.org/docker/2496ED", "docker.svg"),
    ("https://cdn.simpleicons.org/kubernetes/326CE5", "kubernetes.svg"),
    ("https://cdn.simpleicons.org/nginx/009639", "nginx.svg"),
    ("https://cdn.simpleicons.org/apache/D22128", "apache.svg"),
    ("https://cdn.simpleicons.org/mysql/4479A1", "mysql.svg"),
    ("https://cdn.simpleicons.org/postgresql/4169E1", "postgresql.svg"),
    ("https://cdn.simpleicons.org/mongodb/47A248", "mongodb.svg"),
    ("https://cdn.simpleicons.org/redis/DC382D", "redis.svg"),
    ("https://cdn.simpleicons.org/linux/FCC624", "linux.svg"),
    ("https://cdn.simpleicons.org/windows/0078D6", "windows.svg"),
    ("https://cdn.simpleicons.org/ubuntu/E95420", "ubuntu.svg"),
    ("https://cdn.simpleicons.org/debian/A81D33", "debian.svg"),
    ("https://cdn.simpleicons.org/centos/262577", "centos.svg"),
    ("https://cdn.simpleicons.org/redhat/EE0000", "redhat.svg"),
    ("https://cdn.simpleicons.org/jenkins/D24939", "jenkins.svg"),
    ("https://cdn.simpleicons.org/git/F05032", "git.svg"),
    ("https://cdn.simpleicons.org/github/181717", "github.svg"),
    ("https://cdn.simpleicons.org/gitlab/FC6D26", "gitlab.svg"),
    ("https://cdn.simpleicons.org/prometheus/E6522C", "prometheus.svg"),
    ("https://cdn.simpleicons.org/grafana/F46800", "grafana.svg"),
    ("https://cdn.simpleicons.org/elasticsearch/005571", "elasticsearch.svg"),
    ("https://cdn.simpleicons.org/kibana/005571", "kibana.svg"),
    ("https://cdn.simpleicons.org/ansible/EE0000", "ansible.svg"),
    ("https://cdn.simpleicons.org/terraform/7B42BC", "terraform.svg"),
    ("https://cdn.simpleicons.org/vmware/607078", "vmware.svg"),
    ("https://cdn.simpleicons.org/virtualbox/183A61", "virtualbox.svg"),
]

# Configuration
OUTPUT_DIR = "icons"
DELAY_BETWEEN_REQUESTS = 0.5  # seconds - be nice to the server
USER_AGENT = 'Educational-Icon-Downloader/1.0 (https://github.com/dmccreary/it-management-graph)'

# Set up headers
headers = {
    'User-Agent': USER_AGENT,
    'Accept': 'image/svg+xml,image/*,*/*'
}

def download_icons():
    """Download all icons with proper error handling and rate limiting"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success_count = 0
    fail_count = 0
    failed_icons = []

    print(f"Starting download of {len(icons)} icons...")
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Rate limit: {DELAY_BETWEEN_REQUESTS}s between requests\n")

    for i, (url, fname) in enumerate(icons, 1):
        print(f"[{i}/{len(icons)}] Downloading {fname}...", end=" ")

        try:
            # Make the request
            r = requests.get(url, headers=headers, timeout=10)

            if r.ok:
                # Save the file
                filepath = os.path.join(OUTPUT_DIR, fname)
                with open(filepath, "wb") as f:
                    f.write(r.content)

                size_kb = len(r.content) / 1024
                print(f"✅ ({size_kb:.1f} KB)")
                success_count += 1
            else:
                print(f"❌ HTTP {r.status_code}")
                fail_count += 1
                failed_icons.append((fname, f"HTTP {r.status_code}"))

        except requests.exceptions.Timeout:
            print("❌ Timeout")
            fail_count += 1
            failed_icons.append((fname, "Timeout"))

        except requests.exceptions.RequestException as e:
            print(f"❌ Error: {str(e)[:50]}")
            fail_count += 1
            failed_icons.append((fname, str(e)[:50]))

        # Rate limiting - be respectful
        if i < len(icons):
            time.sleep(DELAY_BETWEEN_REQUESTS)

    # Print summary
    print(f"\n{'='*60}")
    print(f"Download Summary:")
    print(f"  ✅ Successful: {success_count}")
    print(f"  ❌ Failed: {fail_count}")
    print(f"  Total: {len(icons)}")

    if failed_icons:
        print(f"\nFailed downloads:")
        for fname, reason in failed_icons:
            print(f"  - {fname}: {reason}")

    print(f"\nIcons saved to: {os.path.abspath(OUTPUT_DIR)}")

    return success_count, fail_count

if __name__ == "__main__":
    download_icons()
