#!/usr/bin/env python3
"""
Download free network diagram topology icons
Uses multiple free sources: Font Awesome, OpenClipart, and other CC0/public domain sources
"""
import os
import requests
import time

# Network topology and infrastructure icons
# These are actual network diagram elements, not brand logos
icons = [
    # From Font Awesome (free, via CDN)
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/server.svg", "server.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/database.svg", "database.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/laptop.svg", "laptop.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/desktop.svg", "desktop.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/mobile-screen.svg", "mobile.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/tablet-screen-button.svg", "tablet.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/shield-halved.svg", "firewall.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/cloud.svg", "cloud.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/network-wired.svg", "network.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/wifi.svg", "wifi.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/ethernet.svg", "ethernet.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/print.svg", "printer.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/fax.svg", "fax.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/router.svg", "router.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/building.svg", "building.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/house.svg", "house.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/globe.svg", "internet.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/hard-drive.svg", "storage.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/hdd.svg", "hdd.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/plug.svg", "power.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/tower-broadcast.svg", "broadcast.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/satellite-dish.svg", "satellite.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/circle-nodes.svg", "nodes.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/diagram-project.svg", "network-topology.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/link.svg", "connection.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/user.svg", "user.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/users.svg", "users.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/lock.svg", "lock.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/unlock.svg", "unlock.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/key.svg", "key.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/video.svg", "camera.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/phone.svg", "phone.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/headset.svg", "voip.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/microchip.svg", "processor.svg"),
    ("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/svgs/solid/memory.svg", "memory.svg"),

    # Brand-specific for OS (from Simple Icons)
    ("https://cdn.simpleicons.org/windows/0078D6", "windows.svg"),
    ("https://cdn.simpleicons.org/apple/000000", "mac.svg"),
    ("https://cdn.simpleicons.org/linux/FCC624", "linux.svg"),
    ("https://cdn.simpleicons.org/android/3DDC84", "android.svg"),
]

# Configuration
OUTPUT_DIR = "network-icons"
DELAY_BETWEEN_REQUESTS = 0.2
USER_AGENT = 'Educational-Icon-Downloader/1.0 (IT Management Course)'

headers = {
    'User-Agent': USER_AGENT,
    'Accept': 'image/svg+xml,image/*,*/*'
}

def download_icons():
    """Download network diagram icons"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success_count = 0
    fail_count = 0
    failed_icons = []

    print(f"🔽 Downloading {len(icons)} network diagram icons...")
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print(f"⏱️  Rate limit: {DELAY_BETWEEN_REQUESTS}s between requests")
    print(f"📜 License: Font Awesome Free License + Simple Icons CC0\n")

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
    print(f"\n📜 Licenses:")
    print(f"   - Font Awesome: Free License (CC BY 4.0)")
    print(f"   - Simple Icons: CC0 (Public Domain)")

    return success_count, fail_count

if __name__ == "__main__":
    success, failed = download_icons()
    exit(0 if failed == 0 else 1)
