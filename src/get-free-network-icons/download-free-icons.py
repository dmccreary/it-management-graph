#!/usr/bin/env python3
import os, requests, zipfile, io

# each (url, filename)
icons = [
  # Cisco-style open SVGs
  ("https://upload.wikimedia.org/wikipedia/commons/7/78/Network_router_icon.svg", "router.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/8/83/Server_icon.svg", "server.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/2/21/Network_switch_icon.svg", "switch.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/a/a4/Firewall_icon.svg", "firewall.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/0/02/Cloud_icon.svg", "cloud.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/d/dc/Wireless_router_icon.svg", "wifi_router.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/2/27/Database_icon.svg", "database.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/6/6b/Workstation_icon.svg", "workstation.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/5/55/Laptop_icon.svg", "laptop.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/f/f1/Printer_icon.svg", "printer.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/3/3f/Network_cable_icon.svg", "ethernet.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/9/9f/Internet_icon.svg", "internet.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/4/49/Modem_icon.svg", "modem.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/7/72/Network_storage_icon.svg", "nas.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/4/4d/VPN_icon.svg", "vpn.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/5/5a/Security_camera_icon.svg", "camera.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/f/f5/Mobile_device_icon.svg", "mobile.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/2/25/Smart_home_icon.svg", "iot.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/3/30/DNS_icon.svg", "dns.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/7/75/Mail_server_icon.svg", "mail.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/0/0b/Web_server_icon.svg", "webserver.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/5/54/Proxy_server_icon.svg", "proxy.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/f/fb/Load_balancer_icon.svg", "loadbalancer.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/0/05/Data_center_icon.svg", "datacenter.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/7/79/Satellite_icon.svg", "satellite.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/8/8f/Cloud_database_icon.svg", "cloud_database.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/d/d6/Backup_icon.svg", "backup.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/6/64/Monitoring_icon.svg", "monitoring.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/b/bd/Terminal_icon.svg", "terminal.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/9/9c/API_icon.svg", "api.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/f/f3/AI_chip_icon.svg", "ai_chip.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/3/33/Cloud_security_icon.svg", "cloud_security.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/b/b7/Key_management_icon.svg", "key_mgmt.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/a/af/Container_icon.svg", "container.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/5/59/Server_rack_icon.svg", "rack.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/2/2f/Wireless_access_point_icon.svg", "ap.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/f/fd/CDN_icon.svg", "cdn.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/e/e4/Edge_computing_icon.svg", "edge.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/8/86/Cloud_gateway_icon.svg", "gateway.svg"),
  ("https://upload.wikimedia.org/wikipedia/commons/6/60/SDN_controller_icon.svg", "sdn_controller.svg")
]

os.makedirs("icons", exist_ok=True)
for url, fname in icons:
    r = requests.get(url)
    if r.ok:
        with open(os.path.join("icons", fname), "wb") as f:
            f.write(r.content)
        print("Saved", fname)

print("✅ Downloaded", len(icons), "icons")
