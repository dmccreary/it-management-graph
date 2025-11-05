#!/usr/bin/env python3
"""
Download IT device and management icons
Uses Bootstrap Icons (MIT License) - free for commercial use
"""
import os
import requests
import time

# IT device and management icons from Bootstrap Icons
# All icons are MIT licensed - completely free for commercial use
# Source: https://github.com/twbs/icons
icons = [
    # Computers & Devices
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/pc-display.svg", "desktop-pc.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/pc-display-horizontal.svg", "desktop-horizontal.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/laptop.svg", "laptop.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/tablet.svg", "tablet.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/phone.svg", "phone.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/smartwatch.svg", "smartwatch.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/display.svg", "monitor.svg"),

    # Servers & Infrastructure
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/server.svg", "server.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/hdd.svg", "hard-drive.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/hdd-rack.svg", "hdd-rack.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/hdd-stack.svg", "hdd-stack.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/hdd-network.svg", "network-storage.svg"),

    # Database
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/database.svg", "database.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/database-add.svg", "database-add.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/database-check.svg", "database-check.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/database-gear.svg", "database-gear.svg"),

    # Storage
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/device-hdd.svg", "device-storage.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/device-ssd.svg", "ssd-drive.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/save.svg", "save.svg"),

    # Peripherals
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/printer.svg", "printer.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/mouse.svg", "mouse.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/keyboard.svg", "keyboard.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/headset.svg", "headset.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/webcam.svg", "webcam.svg"),

    # Network
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/router.svg", "router.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/wifi.svg", "wifi.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/ethernet.svg", "ethernet.svg"),

    # Cloud & Virtual
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/cloud.svg", "cloud.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/cloud-arrow-up.svg", "cloud-upload.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/cloud-arrow-down.svg", "cloud-download.svg"),

    # Users & Management
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/person.svg", "user.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/people.svg", "users.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/person-workspace.svg", "user-workstation.svg"),

    # Security
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/shield-check.svg", "security.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/lock.svg", "lock.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/unlock.svg", "unlock.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/key.svg", "key.svg"),

    # Monitoring & Status
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/activity.svg", "activity.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/speedometer.svg", "performance.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/graph-up.svg", "metrics.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/cpu.svg", "processor.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/memory.svg", "memory.svg"),

    # Buildings & Locations
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/building.svg", "office-building.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/house.svg", "home.svg"),
    ("https://raw.githubusercontent.com/twbs/icons/main/icons/geo-alt.svg", "location.svg"),
]

# Add Apple/Mac specific icons from Simple Icons
mac_icons = [
    ("https://cdn.simpleicons.org/apple/000000", "apple-mac.svg"),
    ("https://cdn.simpleicons.org/windows/0078D6", "windows-logo.svg"),
    ("https://cdn.simpleicons.org/linux/FCC624", "linux-logo.svg"),
]

# Combine all icons
all_icons = icons + mac_icons

# Configuration
OUTPUT_DIR = "it-device-icons"
DELAY_BETWEEN_REQUESTS = 0.3
USER_AGENT = 'Educational-Icon-Downloader/1.0 (IT Management Course)'

headers = {
    'User-Agent': USER_AGENT,
    'Accept': 'image/svg+xml,image/*,*/*'
}

def download_icons():
    """Download IT device and management icons"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    success_count = 0
    fail_count = 0
    failed_icons = []

    print(f"🔽 Downloading {len(all_icons)} IT device & management icons...")
    print(f"📁 Output directory: {OUTPUT_DIR}")
    print(f"⏱️  Rate limit: {DELAY_BETWEEN_REQUESTS}s between requests")
    print(f"📜 License: MIT (Bootstrap Icons) + CC0 (Simple Icons)\n")

    for i, (url, fname) in enumerate(all_icons, 1):
        print(f"[{i:2d}/{len(all_icons)}] {fname:30s}", end=" ")

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

        if i < len(all_icons):
            time.sleep(DELAY_BETWEEN_REQUESTS)

    # Summary
    print(f"\n{'='*70}")
    print(f"📊 Download Summary:")
    print(f"   ✅ Successful: {success_count}/{len(all_icons)} ({success_count/len(all_icons)*100:.1f}%)")
    print(f"   ❌ Failed: {fail_count}/{len(all_icons)}")

    if failed_icons:
        print(f"\n❌ Failed downloads:")
        for fname, reason in failed_icons:
            print(f"   - {fname}: {reason}")

    print(f"\n📁 Icons saved to: {os.path.abspath(OUTPUT_DIR)}")
    print(f"\n📜 Licenses:")
    print(f"   - Bootstrap Icons: MIT License (free for commercial use)")
    print(f"   - Simple Icons: CC0 (Public Domain)")
    print(f"   - Source: https://github.com/twbs/icons")

    return success_count, fail_count

if __name__ == "__main__":
    success, failed = download_icons()
    exit(0 if failed == 0 else 1)
