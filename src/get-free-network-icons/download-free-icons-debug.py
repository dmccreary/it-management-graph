#!/usr/bin/env python3
"""
Diagnostic version of icon downloader that shows what's failing
"""
import os, requests

# Test with a few URLs first
icons = [
  ("https://upload.wikimedia.org/wikipedia/commons/7/78/Network_router_icon.svg", "router.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/8/83/Server_icon.svg", "server.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/2/21/Network_switch_icon.svg", "switch.svg"),
]

os.makedirs("icons", exist_ok=True)

success_count = 0
fail_count = 0

for url, fname in icons:
    print(f"\nAttempting: {fname}")
    print(f"  URL: {url}")

    try:
        r = requests.get(url, timeout=10)
        print(f"  Status: {r.status_code}")

        if r.ok:
            with open(os.path.join("icons", fname), "wb") as f:
                f.write(r.content)
            print(f"  ✅ Saved {fname} ({len(r.content)} bytes)")
            success_count += 1
        else:
            print(f"  ❌ Failed - HTTP {r.status_code}")
            fail_count += 1

    except requests.exceptions.RequestException as e:
        print(f"  ❌ Error: {e}")
        fail_count += 1

print(f"\n{'='*50}")
print(f"Results: {success_count} succeeded, {fail_count} failed")
