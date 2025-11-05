#!/usr/bin/env python3
"""
Download free network and IT infrastructure icons
Uses Simple Icons (CC0 license) - https://simpleicons.org/
"""
import os
import requests
import time

# Network and IT infrastructure icons from Simple Icons (CC0/Public Domain)
# Format: (URL, filename)
# URL format: https://cdn.simpleicons.org/{slug}/{hexcolor}
icons = [
    # Cloud & Infrastructure Providers
    ("https://cdn.simpleicons.org/cisco/1BA0D7", "cisco.svg"),
    ("https://cdn.simpleicons.org/googlecloud/4285F4", "gcp.svg"),
    ("https://cdn.simpleicons.org/cloudflare/F38020", "cloudflare.svg"),
    ("https://cdn.simpleicons.org/digitalocean/0080FF", "digitalocean.svg"),
    ("https://cdn.simpleicons.org/oracle/F80000", "oracle.svg"),
    ("https://cdn.simpleicons.org/ibm/054ADA", "ibm.svg"),

    # Containerization & Orchestration
    ("https://cdn.simpleicons.org/docker/2496ED", "docker.svg"),
    ("https://cdn.simpleicons.org/kubernetes/326CE5", "kubernetes.svg"),
    ("https://cdn.simpleicons.org/podman/892CA0", "podman.svg"),

    # Web Servers & Reverse Proxies
    ("https://cdn.simpleicons.org/nginx/009639", "nginx.svg"),
    ("https://cdn.simpleicons.org/apache/D22128", "apache.svg"),
    ("https://cdn.simpleicons.org/caddy/1F88C0", "caddy.svg"),

    # Databases
    ("https://cdn.simpleicons.org/mysql/4479A1", "mysql.svg"),
    ("https://cdn.simpleicons.org/postgresql/4169E1", "postgresql.svg"),
    ("https://cdn.simpleicons.org/mongodb/47A248", "mongodb.svg"),
    ("https://cdn.simpleicons.org/redis/DC382D", "redis.svg"),
    ("https://cdn.simpleicons.org/mariadb/003545", "mariadb.svg"),
    ("https://cdn.simpleicons.org/sqlite/003B57", "sqlite.svg"),
    ("https://cdn.simpleicons.org/cassandra/1287B1", "cassandra.svg"),
    ("https://cdn.simpleicons.org/neo4j/4581C3", "neo4j.svg"),

    # Operating Systems
    ("https://cdn.simpleicons.org/linux/FCC624", "linux.svg"),
    ("https://cdn.simpleicons.org/ubuntu/E95420", "ubuntu.svg"),
    ("https://cdn.simpleicons.org/debian/A81D33", "debian.svg"),
    ("https://cdn.simpleicons.org/centos/262577", "centos.svg"),
    ("https://cdn.simpleicons.org/redhat/EE0000", "redhat.svg"),
    ("https://cdn.simpleicons.org/alpinelinux/0D597F", "alpine.svg"),
    ("https://cdn.simpleicons.org/fedora/51A2DA", "fedora.svg"),

    # DevOps & CI/CD
    ("https://cdn.simpleicons.org/jenkins/D24939", "jenkins.svg"),
    ("https://cdn.simpleicons.org/git/F05032", "git.svg"),
    ("https://cdn.simpleicons.org/github/181717", "github.svg"),
    ("https://cdn.simpleicons.org/gitlab/FC6D26", "gitlab.svg"),
    ("https://cdn.simpleicons.org/bitbucket/0052CC", "bitbucket.svg"),
    ("https://cdn.simpleicons.org/ansible/EE0000", "ansible.svg"),
    ("https://cdn.simpleicons.org/terraform/7B42BC", "terraform.svg"),
    ("https://cdn.simpleicons.org/puppet/FFAE1A", "puppet.svg"),
    ("https://cdn.simpleicons.org/chef/F09820", "chef.svg"),

    # Monitoring & Observability
    ("https://cdn.simpleicons.org/prometheus/E6522C", "prometheus.svg"),
    ("https://cdn.simpleicons.org/grafana/F46800", "grafana.svg"),
    ("https://cdn.simpleicons.org/elasticsearch/005571", "elasticsearch.svg"),
    ("https://cdn.simpleicons.org/kibana/005571", "kibana.svg"),
    ("https://cdn.simpleicons.org/datadog/632CA6", "datadog.svg"),
    ("https://cdn.simpleicons.org/newrelic/008C99", "newrelic.svg"),
    ("https://cdn.simpleicons.org/splunk/000000", "splunk.svg"),

    # Virtualization
    ("https://cdn.simpleicons.org/vmware/607078", "vmware.svg"),
    ("https://cdn.simpleicons.org/virtualbox/183A61", "virtualbox.svg"),
    ("https://cdn.simpleicons.org/qemu/FF6600", "qemu.svg"),

    # Message Queues & Streaming
    ("https://cdn.simpleicons.org/rabbitmq/FF6600", "rabbitmq.svg"),
    ("https://cdn.simpleicons.org/apachekafka/231F20", "kafka.svg"),

    # Security
    ("https://cdn.simpleicons.org/letsencrypt/003A70", "letsencrypt.svg"),
    ("https://cdn.simpleicons.org/vault/000000", "vault.svg"),

    # Networking & CDN
    ("https://cdn.simpleicons.org/wireguard/88171A", "wireguard.svg"),
    ("https://cdn.simpleicons.org/openvpn/EA7E20", "openvpn.svg"),

    # Service Mesh
    ("https://cdn.simpleicons.org/istio/466BB0", "istio.svg"),
    ("https://cdn.simpleicons.org/envoyproxy/AC6199", "envoy.svg"),
]

# Configuration
OUTPUT_DIR = "icons"
DELAY_BETWEEN_REQUESTS = 0.3  # seconds
USER_AGENT = 'Educational-Icon-Downloader/1.0 (https://github.com/dmccreary/it-management-graph)'

headers = {
    'User-Agent': USER_AGENT,
    'Accept': 'image/svg+xml,image/*,*/*'
}

def download_icons():
    """Download all icons with error handling and rate limiting"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success_count = 0
    fail_count = 0
    failed_icons = []

    print(f"🔽 Downloading {len(icons)} IT infrastructure icons...")
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print(f"⏱️  Rate limit: {DELAY_BETWEEN_REQUESTS}s between requests")
    print(f"📜 License: CC0 (Public Domain) from Simple Icons\n")

    for i, (url, fname) in enumerate(icons, 1):
        print(f"[{i:2d}/{len(icons)}] {fname:25s}", end=" ")

        try:
            r = requests.get(url, headers=headers, timeout=10)

            if r.ok:
                filepath = os.path.join(OUTPUT_DIR, fname)
                with open(filepath, "wb") as f:
                    f.write(r.content)

                size_kb = len(r.content) / 1024
                print(f"✅ ({size_kb:4.1f} KB)")
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
            error_msg = str(e)[:50]
            print(f"❌ {error_msg}")
            fail_count += 1
            failed_icons.append((fname, error_msg))

        # Rate limiting
        if i < len(icons):
            time.sleep(DELAY_BETWEEN_REQUESTS)

    # Summary
    print(f"\n{'='*70}")
    print(f"📊 Download Summary:")
    print(f"   ✅ Successful: {success_count}/{len(icons)} ({success_count/len(icons)*100:.1f}%)")
    print(f"   ❌ Failed: {fail_count}/{len(icons)}")

    if failed_icons:
        print(f"\n❌ Failed downloads:")
        for fname, reason in failed_icons:
            print(f"   - {fname}: {reason}")

    print(f"\n📁 Icons saved to: {os.path.abspath(OUTPUT_DIR)}")
    print(f"📜 License: CC0 (Public Domain) - https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md")

    return success_count, fail_count

if __name__ == "__main__":
    success, failed = download_icons()
    exit(0 if failed == 0 else 1)
