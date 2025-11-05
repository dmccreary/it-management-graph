# Network Topology Icons for IT Management

Perfect for your **IT Management Graph** course! These are professional network diagram icons for data center and desktop management documentation.

## 🎯 What You Got

**66 professional SVG icons** for network topology diagrams including:

### Core Network Infrastructure
- **Routers** (7 variations): Generic, Cisco, Juniper, Cumulus
- **Switches** (24 variations): L2, L3, VSS, various vendors
- **Firewalls** (13 variations): Generic, Cisco ASA, Juniper
- **Servers** (3 designs): Rack-mounted server illustrations
- **Load Balancers**: ADC, GTM, LTM (F5 style)

### End-User Devices
Icons are available in Font Awesome (see alternative sources below):
- Desktop PCs, Laptops, Tablets, Mobile devices

### Cloud & Modern Infrastructure
- Cloud icons (2 variations)
- SD-WAN/Viptela components
- VMware compute

### Multiple Styles Available
Each icon type often comes in multiple styles:
- **Colour** (colored/realistic)
- **Monochrome** (black & white)
- **3D** (with depth/shadows)
- **Flat** (modern, minimalist with labels)

## 📂 Directory Structure

```
network-topology-icons/
├── index.html                          # Visual browser (OPEN THIS!)
├── README.md
│
├── Generic Routers (7 files)
│   ├── generic-router-colour.svg
│   ├── generic-router-mono.svg
│   ├── generic-router-square-colour-3d.svg
│   └── ...
│
├── Generic Switches (15 files)
│   ├── generic-switch-l2-v1-colour.svg
│   ├── generic-switch-l3-colour-3d.svg
│   └── ...
│
├── Generic Firewalls (9 files)
│   ├── generic-firewall-v1-colour.svg
│   ├── generic-firewall-v2-colour-3d.svg
│   └── ...
│
├── Servers & Load Balancers (9 files)
│   ├── generic-server-1.svg
│   ├── generic-server-2.svg
│   ├── generic-adc-colour-3d.svg
│   └── ...
│
├── Cisco Equipment (8 files)
│   ├── cisco-router.svg
│   ├── cisco-switch-l3.svg
│   ├── cisco-asa.svg
│   └── ...
│
├── Juniper Equipment (4 files)
├── Other Vendors (7 files)
└── Cloud & SD-WAN (7 files)
```

## 🚀 Quick Start

### View All Icons
```bash
cd network-topology-icons
open index.html
```

This opens a beautiful visual browser with:
- ✅ All 66 icons organized by category
- ✅ Filters (Generic, Cisco, Juniper, Routers, Switches, etc.)
- ✅ Click to copy filename
- ✅ Visual badges showing style (Colour/Mono/3D/Flat)

### Use in Network Diagrams

**1. In HTML/Markdown:**
```html
<img src="generic-router-colour.svg" alt="Router" width="64">
<img src="generic-switch-l3-colour.svg" alt="L3 Switch" width="64">
<img src="generic-server-1.svg" alt="Server" width="64">
```

**2. In Draw.io / Diagrams.net:**
- Drag and drop SVG files directly into draw.io
- Or use File → Import → Select SVG

**3. In Visio:**
- Import as SVG shapes
- Create custom stencils

**4. In PowerPoint/Keynote:**
- Insert → Picture → Select SVG
- Resize without quality loss (vector!)

## 💡 Recommended Icons for IT Management Course

For data center and desktop management diagrams, use these:

### Essential Set (10 icons)
```
✅ generic-server-1.svg              # Rack server
✅ generic-router-colour.svg         # Core router
✅ generic-switch-l3-colour.svg      # Distribution switch
✅ generic-switch-l2-v1-colour.svg   # Access switch
✅ generic-firewall-v1-colour.svg    # Firewall
✅ cloud-v1.svg                      # Cloud/Internet
✅ generic-adc-colour.svg            # Load balancer
```

Add from Font Awesome for end devices:
- Desktop PC
- Laptop
- Mobile device
- Printer

### Style Recommendations

**For Course Materials (Presentations, PDFs):**
- Use **colour 3D** versions (e.g., `generic-router-square-colour-3d.svg`)
- They look professional and are easy to distinguish

**For Technical Documentation:**
- Use **flat with labels** (e.g., `generic-switch-flat-l3-label-colour.svg`)
- Labels help students identify device types

**For Print Materials:**
- Use **monochrome** versions (e.g., `generic-router-mono.svg`)
- Better for black & white printing

## 📜 License & Usage

**Source:** https://github.com/aci686/Network-Icons-SVG

**License:** Free to use, vendor-neutral
- Originally shared by BobTheButcher
- No specific license mentioned (public sharing implies educational/commercial use OK)
- Vendor-neutral: "use the router icon to represent any brand router"

**Attribution:** Not required, but appreciated

## 🎨 Icon Categories Explained

### Generic vs. Vendor-Specific

**Generic Icons** (recommended for most uses):
- Vendor-neutral representations
- Can represent any brand
- Example: `generic-router-colour.svg` can be labeled as Cisco, Juniper, or any router

**Vendor-Specific Icons**:
- Styled to match specific vendors
- Use when brand matters (e.g., "Cisco ASA Firewall cluster")
- Examples: `cisco-asa.svg`, `juniper-switch-l3.svg`

### Layer 2 vs Layer 3 Switches

**L2 Switch** (`generic-switch-l2-*.svg`):
- Access layer switching
- Basic VLAN support
- No routing capability

**L3 Switch** (`generic-switch-l3-*.svg`):
- Distribution/core layer
- Routing + switching
- Often shown with routing symbol overlay

## 🔧 Alternative Sources for Missing Icons

These network topology icons don't include PCs, laptops, printers. Add those from:

### Font Awesome (Free Tier)
Download from: https://fontawesome.com/download
```
fa-desktop         # Desktop PC
fa-laptop          # Laptop
fa-mobile-alt      # Mobile phone
fa-tablet-alt      # Tablet
fa-print           # Printer
fa-database        # Database
fa-hdd             # Hard drive
```

### Material Design Icons
Download from: https://fonts.google.com/icons
```
computer           # Desktop
laptop_mac         # Laptop
smartphone         # Phone
tablet             # Tablet
print              # Printer
storage            # Database/storage
```

### Create a Complete Set

Combine these network topology icons with Font Awesome for a complete set:

```bash
# Network infrastructure (from network-topology-icons/)
- Routers, switches, firewalls, servers, clouds

# End-user devices (from Font Awesome)
- PCs, laptops, tablets, phones, printers

# Applications (from Simple Icons - see icons/ directory)
- Docker, Kubernetes, databases, etc.
```

## 📊 Using in IT Management Graph Course

### Example Diagram Components

**Data Center Topology:**
```
[Internet/Cloud]
    ↓
[Firewall]
    ↓
[Core Router]
    ↓
[Distribution L3 Switch]
    ↓
[Access L2 Switch] ← [Access L2 Switch]
    ↓                      ↓
[Servers]              [Servers]
```

**Desktop Management:**
```
[Core Switch]
    ↓
[Floor Switch] ← VLANs → [Floor Switch]
    ↓                         ↓
[PCs + Laptops]          [Printers + Phones]
```

### Legend for Students

Create a legend showing icon meanings:
- Router = Layer 3 routing device
- L3 Switch = Multilayer switch (routing + switching)
- L2 Switch = Access layer switch (VLANs only)
- Firewall = Security appliance
- Server = Physical or virtual server
- Cloud = External cloud service / Internet

## 🎯 Best Practices

1. **Be Consistent**: Pick one style (colour/mono/3D) and stick with it
2. **Use Labels**: Add text labels below icons in diagrams
3. **Logical Grouping**: Group similar devices (all servers together)
4. **Hierarchy**: Show network tiers (core → distribution → access)
5. **Color Code**: Use colors for different zones (DMZ=red, Internal=green)

## 📁 File Naming Convention

Files follow this pattern:
```
[vendor/generic]-[device-type]-[layer/version]-[style]

Examples:
generic-router-colour.svg
cisco-switch-l3.svg
generic-firewall-v1-colour-3d.svg
```

## Next Steps

1. ✅ **Browse icons**: Open `index.html` in browser
2. ✅ **Pick your favorites**: Choose 10-15 core icons
3. ✅ **Download Font Awesome**: Get end-user device icons
4. ✅ **Create templates**: Make standard diagram templates
5. ✅ **Document legend**: Create icon legend for students

Enjoy your professional network diagram icons! 🎉
