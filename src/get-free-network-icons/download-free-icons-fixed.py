#!/usr/bin/env python3
"""
Fixed version with proper User-Agent header
"""
import os, requests

# Test with a few real Wikimedia Commons files first
# These are actual files that exist on Wikimedia Commons
icons = [
  # Real Wikimedia Commons SVG files for testing
  ("https://upload.wikimedia.org/wikipedia/commons/6/66/Crystal_128_connect_established.svg", "network.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/d/d9/Crystal_Clear_device_blockdevice.svg", "server.svg"),
]

# Set a proper User-Agent to avoid 403 errors
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

os.makedirs("icons", exist_ok=True)

success_count = 0
fail_count = 0

for url, fname in icons:
    print(f"\nAttempting: {fname}")
    print(f"  URL: {url}")

    try:
        r = requests.get(url, headers=headers, timeout=10)
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
